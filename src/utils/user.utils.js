import custimAxios from "../configs/axios.config";

export const userUtils = {
  getUsers: async () => {
    const { data } = await custimAxios.get("user/all");
    return data;
  },
  getSingleUser: async () => {
    const { data } = await custimAxios.get("user/me")
    return data;
  },
  getUserDevice: async (userId) => {
    const { data } = await custimAxios.get(`user/user-device/${userId}`);
    return data;
  },
  postUser: async ({ password, phone, roles, username }) => {
    const { data } = await custimAxios.post("user/add", {
      password: password,
      phone: phone,
      roles: roles,
      username: username,
    });
    return data;
  },
  patchUser: async ({
    id,
    image,
    name,
    password,
    phone,
    roles,
    username,
  }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("phone", phone);
    for (const role of roles) {
      formData.append("roles", role);
    }
    formData.append("username", username);
    const { data } = await custimAxios.patch(`user/edit/${id}`, formData);
    return data;
  },
  deletUser: async (id) => {
    const { data } = await custimAxios.delete(`user/delete/${id}`);
    return data;
  },
};
