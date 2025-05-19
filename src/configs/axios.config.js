import axios from 'axios'
import { SERVER_BASE_URL } from '../constants/server.constants'
import { authUtils } from '../utils/auth.utils'

const custimAxios = axios.create({
	baseURL: SERVER_BASE_URL,
	timeout: 10000,
})

custimAxios.defaults.headers.common[
	'Authorization'
] = `Bearer ${localStorage.getItem('accessToken')}`

custimAxios.interceptors.response.use(
	res => res,
	async err => {
		if (err?.response?.status === 406) {
			try {
				await authUtils.refreshAuth()
				window.location.reload() // Refresh muvaffaqiyatli bo'lsa qayta yuklash
			} catch (refreshErr) {
				console.error('Auth refresh failed:', refreshErr)
			}
		} else if (err?.response?.status === 455) {
			localStorage.clear()
			window.location.reload()
		}
		return Promise.reject(err)
	}
)
export default custimAxios
