import custimAxios from "../configs/axios.config";

export const comfortUtils = {
  getComfort: async () => {
    const { data } = await custimAxios.get("comfort", {
      headers: {
        "accept-language": localStorage.getItem("language") || "uz",
      },
    });

    return data;
  },
  postComfort: async ({ image, name }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    const { data } = await custimAxios.post("comfort/add", formData);
    return data;
  },
  patchComfort: async ({ id, name }) => {
    console.log(name);
    const { data } = await custimAxios.patch(`comfort/edit/${id}`, { name });
    return data;
  },
  editComfortImage: async ({ id, image }) => {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await custimAxios.patch(
      `comfort/edit/image/${id}`,
      formData
    );
  },
  deleteComfort: async (id) => {
    const { data } = await custimAxios.delete(`comfort/delete/${id}`);
    return data;
  },
};
