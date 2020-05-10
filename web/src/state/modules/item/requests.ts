import axios from "axios";
import Cookies from "universal-cookie";

import { setItemList } from "./actions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(undefined, (error: any) => {
  if (
    error.config &&
    error.response &&
    error.response.data.error === "token_expired"
  ) {
    return updateToken().then((accessToken) => {
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance.request(error.config);
    });
  }
  return Promise.reject(error);
});

const updateToken = (): Promise<[string, string]> => {
  const [accessToken, refreshToken] = getTokens();
  return axios
    .get(`${process.env.REACT_APP_API_URL}/auth/login`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((response) => {
      const cookies = new Cookies();

      const userData = cookies.get("auth_info");

      userData.accessToken = response.data.accessToken;

      cookies.set("auth_info", userData);

      return response.data.accessToken;
    });
};

const getTokens = () => {
  const cookies = new Cookies();
  const { accessToken, refreshToken } = cookies.get("auth_info");

  return [accessToken, refreshToken];
};

export const getItemList = () => async (dispatch: any) => {
  const [accessToken] = getTokens();

  return axiosInstance
    .get("/items", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      const { data } = response.data;

      dispatch(setItemList(data));
    });
};

export const createItem = (name: string) => async (dispatch: any) => {
  const [accessToken] = getTokens();

  return axiosInstance
    .post(
      `/items`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(() => dispatch(getItemList()));
};

export const updateItem = (id: number, name: string) => async (
  dispatch: any
) => {
  const [accessToken] = getTokens();

  return axiosInstance
    .put(
      `/items/${id}`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(() => dispatch(getItemList()));
};

export const removeItem = (id: number) => async (dispatch: any) => {
  const [accessToken] = getTokens();
  return axiosInstance
    .delete(`/items/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => dispatch(getItemList()));
};

export const removeMultipleItems = () => async (
  dispatch: any,
  getState: any
) => {
  const [accessToken] = getTokens();
  const ids = getState().items.selectedItems;
  return axiosInstance
    .delete(`/items/_bulk`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ids,
      },
    })
    .then(() => dispatch(getItemList()));
};
