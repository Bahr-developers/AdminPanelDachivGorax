import custimAxios from "../configs/axios.config";

export const authUtils = {
  loginAuthAdmin: async ({ password, username }) => {
    const { data } = await custimAxios.post("/auth/login/admin", {
      password,
      userAgent: window.navigator.userAgent,
      username,
    });
    return data;
  },
  refreshAuth: async () => {
    const { data } = await custimAxios.post(
      "/auth/refresh",
      {
        userAgent: window.navigator.userAgent,
      },
      {
        headers: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      }
    );
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    custimAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.accessToken}`;

    return data;
  },
};
