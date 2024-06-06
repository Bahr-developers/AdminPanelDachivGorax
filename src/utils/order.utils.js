import custimAxios from "../configs/axios.config"


export const OrderUtils = {
    getOrderAdmin: async () => {
        const {data} = await custimAxios.get('order/all/for/admin', {
            headers: {
                "accept-language": localStorage.getItem("language"),
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        return data
    },
    activeOrder: async ({cottageId, tariffId}) => {
        const {data} = await custimAxios.post('order/add', {
            tariffId,
            cottageId
        },
    {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
        return data
    },
    editOrder: async ({orderId, orderStatus, status}) => {
        const {data} = await custimAxios.patch(`order/update/${orderId}`, {
            orderId,
            status,
            orderStatus
        }, 
     {
        headers: {
            "accept-language": localStorage.getItem("language"),
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
     })
     return data
    },
    deleteOrder: async (id) => {
        const {data} = await custimAxios.delete(`order/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        return data
    } 
}