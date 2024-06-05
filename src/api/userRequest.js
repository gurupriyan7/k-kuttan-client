import axios from "axios";
import { appConfig } from "../config/appConfig";
import { getLocalStorageItem } from "../utils/appUtils";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getUserProfile = async () => {
  try {
    const token = getLocalStorageItem("token");
    console.log(token,"token");
    return await API.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userData) => {
  try {
    const token = getLocalStorageItem("token");

    return await API.patch(
      `user`,
      {
        ...userData
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const updateAuthor = async (userData) => {
  try {
    const token = getLocalStorageItem("token");

    return await API.patch(
      `user/author`,
      {
        ...userData
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
