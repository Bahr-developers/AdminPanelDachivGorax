import custimAxios from "../configs/axios.config";

export const notificationUtils = {
  getAllNitification: async () => {
    const { data } = await custimAxios.get("/notification/all/");
    return data;
  },
  getNotification: async (id) => {
    const { data } = await custimAxios.get(`/notification/${id}`);
    return data;
  },
  postNatification: async ({ message, type, userId = "" }) => {
    const { data } = await custimAxios.post("/notification/add", {
      message: message,
      type: type,
      userId: userId,
    });
    return data;
  },
  patchNatification: async ({ id, watchedUserId, status }) => {
    const { data } = await custimAxios.patch(`/notification/update/${id}`, {
      watchedUserId: watchedUserId,
      status: status,
    });
    return data;
  },
  deleteNatification: async (id) => {
    const { data } = await custimAxios.delete(`/notification/delete/${id}`);
    return data;
  },
};
