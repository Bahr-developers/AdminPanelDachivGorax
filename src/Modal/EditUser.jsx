import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { userUtils } from '../utils/user.utils'
import toastify from '../utils/toastify'
import { CiEdit } from 'react-icons/ci'
import { IoMdCloudUpload } from 'react-icons/io'
import { QUERY_KEYS, useRoles } from '../Query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdCloudUpload } from 'react-icons/md'

function EditUser({ user }) {
	const queryClient = useQueryClient()
	const [image, setImage] = useState('')
	const [file, setFile] = useState('')

	const [perRoles, setPerRoles] = useState({
		rolesChack: [...user?.roles],
		response: [...user?.roles],
	})

	const role = useRoles()

	const editUser = useMutation({
		mutationFn: userUtils.patchUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] })
			toastify.successMessage('User muvaffaqiyatli tahrirlandi. ')
		},
		onError: err => {
			toastify.errorMessage('Hatolik mavjud')
			console.log(err)
		},
	})

	const handlRole = e => {
		const { value, checked } = e.target
		const { rolesChack } = perRoles
		if (checked) {
			setPerRoles({
				rolesChack: [...rolesChack, value],
				response: [...rolesChack, value],
			})
		} else {
			setPerRoles({
				rolesChack: rolesChack.filter(e => e !== value),
				response: rolesChack.filter(e => e !== value),
			})
		}
	}

	const handleGetFile = e => {
		const files = e.target.files[0]
		setFile(files)
		if (files) {
			setImage(URL.createObjectURL(files))
		}
	}

	const handlEditUser = e => {
		e.preventDefault()
		editUser.mutate({
			id: user.id,
			name: e.target.name.value,
			username: e.target.username.value,
			password: e.target.password.value,
			phone: e.target.phonenumber.value ? e.target.phonenumber.value : '',
			roles: [perRoles?.response[0]?.role?.id],
			image: file || '',
		})
	}

	return (
		<div>
			<button
				type='button'
				className='btn btn-success d-block mx-auto'
				data-bs-toggle='modal'
				data-bs-target={`#exampleModal${user.id}`}
			>
				<CiEdit size={25} className='text-white' />
			</button>

			<div
				className='modal fade'
				id={`exampleModal${user.id}`}
				tabIndex='-1'
				aria-labelledby={`exampleModal${user.id}Label`}
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id={`exampleModal${user.id}Label`}>
								User info
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handlEditUser}>
								<label className='d-block mb-2'>
									<span>Name</span>
									<input
										type='text'
										className='form-control'
										name='name'
										placeholder='Name'
										defaultValue={user?.name}
									/>
								</label>
								<label className='d-block mb-2'>
									<span>Username</span>
									<input
										type='text'
										className='form-control'
										name='username'
										placeholder='User name'
										defaultValue={user?.username}
									/>
								</label>
								<label className='d-block mb-2'>
									<span>Password</span>
									<input
										type='text'
										className='form-control'
										name='password'
										placeholder='Password'
										defaultValue={user?.password}
									/>
								</label>
								<label className='d-block mb-2'>
									<span>Number</span>
									<input
										type='number'
										className='form-control'
										name='phonenumber'
										placeholder='97 123 45 68'
										defaultValue={user?.phone}
									/>
								</label>
								<div className='d-flex align-items-center gap-5 my-4'>
									<label className='btn btn-primary d-flex align-items-center gap-2'>
										<MdCloudUpload size={25} />
										<span className='d-block'>Upload Img</span>
										<input
											id={`uploadImg${user.id}`}
											className='d-none'
											type='file'
											accept='image/*'
											name='file'
											onChange={handleGetFile}
										/>
									</label>
									{image ? (
										<LazyLoadImage
											src={image}
											width={60}
											height={60}
											alt='place image'
											effect='blur'
											className='rounded'
										/>
									) : (
										<p className='m-0'>No choosen image</p>
									)}
								</div>
								<h4 className='mt-2'>Roles: </h4>
								<div className='roles-wrap px-3'>
									{role.data?.length &&
										role.data.map(e => {
											return (
												<label
													key={e.id}
													className='d-flex gap-2 align-items-center mt-4'
												>
													<input
														className='chakbox form-check-input'
														type='checkbox'
														name={e.id}
														value={e.id}
														onChange={handlRole}
														defaultChecked={perRoles.rolesChack.some(
															el => el?.role?.id == e?.id
														)}
													/>
													<span className='d-block fw-medium'>{e.name}</span>
												</label>
											)
										})}
								</div>
								<div className='text-end'>
									<button
										data-bs-dismiss='modal'
										type='submit'
										className='btn btn-success mt-3'
									>
										Save changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditUser
