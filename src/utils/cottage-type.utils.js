import custimAxios from "../configs/axios.config";

export const cottageTypeUtils = {
  getCottageType: async () => {
    const { data } = await custimAxios.get("/cottage-type", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  postCottageType: async ({ name, image }) => {
    const formData= new FormData()
    formData.append("image", image);
    formData.append('name', name)
    const { data } = await custimAxios.post("/cottage-type/add", formData);
    return data;
  },
  patchCottageType: async ({ id, name }) => {
    const { data } = await custimAxios.patch(`/cottage-type/edit/${id}`, {
      name: name,
    });
    return data;
  },  
  editCottageTypeImg: async ({ id, image }) => {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await custimAxios.patch(
      `cottage-type/edit/image/${id}`,
      formData
    );
  },
  deleteCottageType: async (id) => {
    const { data } = await custimAxios.delete(`/cottage-type/delete/${id}`);
    return data;
  },
};
