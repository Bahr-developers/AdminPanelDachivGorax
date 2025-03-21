import custimAxios from "../configs/axios.config";

export const cottageUtils = {
  getCottage: async () => {
    const { data } = await custimAxios.get("/cottage", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  postCottage: async ({
    comforts,
    cottageType,
    description,
    mainImage,
    images,
    name,
    placeId,
    price,
    priceWeekend,
    regionId,
    longitude,
    latitude
  }) => {
    try {
      const formData = new FormData();
      for (const el of comforts) {
        formData.append("comforts", el);
      }
      for (const el of cottageType) {
        formData.append("cottageType", el);
      }
      for (const el of images) {
        formData.append("images", el);
      }
      formData.append("name", name);
      formData.append("mainImage", mainImage);
      formData.append("placeId", placeId);
      formData.append("regionId", regionId);
      formData.append("price", price);
      formData.append("priceWeekend", priceWeekend);
      formData.append("description", description);
      formData.append("longitude", longitude)
      formData.append("latitude", latitude)
      const { data } = await custimAxios.post("cottage/add", formData);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  addCottageImage: async ({ cottageId, image, isMainImage }) => {
    const formData = new FormData();
    formData.append("cottageId", cottageId);
    formData.append("image", image);
    formData.append("isMainImage", isMainImage);
    const { data } = await custimAxios.post("cottage/image/add", formData);
    return data;
  },
  orderActivePre: async ({cottageId, expireDays, priority, serviceCode}) => {
    const {data} = await custimAxios.post(`cottage/add/premium/${cottageId}`, {
        expireDays,
        priority,
        serviceCode
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
    }) 
    return data
  },
  patchCottageText: async ({
    id,
    comforts,
    cottageStatus,
    cottageType,
    description,
    name,
    price,
    priceWeekend,
    status,
    lattitude,
    longitude,
  }) => {
    const { data } = await custimAxios.patch(`/cottage/edit/${id}`, {
      comforts: comforts,
      cottageStatus: cottageStatus,
      cottageType: cottageType,
      description: description,
      name: name,
      price: price,
      priceWeekend: priceWeekend,
      status: status,
      lattitude: lattitude,
      longitude: longitude,
    });
    return data;
  },

  patchCottageImage: async ({ id, image }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("status", "active");

    const { data } = await custimAxios.patch(
      `/cottage/image/edit/${id}`,
      formData
    );
    return data;
  },
  deleteCottageAll: async (id) => {
    const { data } = await custimAxios.delete(`/cottage/delete/${id}`);
    return data;
  },
  deleteCottageImage: async (id) => {
    const { data } = await custimAxios.delete(`/cottage/image/delete/${id}`);
    return data;
  },
};
