import axios from "axios";
import { appConfig } from "../config/appConfig";
import { authCheck, getLocalStorageItem } from "../utils/appUtils";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getUserProfile = async () => {
  try {
    const token = getLocalStorageItem("token");
    return await API.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
export const getAuthorUserProfile = async (authorId) => {
  try {
    return await API.get(`/user/${authorId}`, {
    });
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
export const getAllUsers = async (page) => {
  try {
    const token = getLocalStorageItem("token");
    const data = await API.get(`/user/all?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });

    console.log(data, "usersssssssssssssssss");
    return data;
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
export const getAllAvailableChatUsers = async (searchTeam) => {
  try {
    const token = getLocalStorageItem("token");
    const data = await API.get(`/user/all-chat?searchTerm=${searchTeam}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });

    console.log(data, "usersssssssssssssssss");
    return data;
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
export const getFollowersFollowings = async (isFollowers) => {
  try {
    const token = getLocalStorageItem("token");
    const data = await API.get(`/user/followers?isFollowers=${isFollowers}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    })

    console.log(data, "usersssssssssssssssss");
    return data?.data
  } catch (error) {
    await authCheck(error);
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
    await authCheck(error);
    console.log(error);
  }
};
export const followUnFollowUser = async (userId) => {
  try {
    const token = getLocalStorageItem("token");

    return await API.patch(
      `user/${userId}`,
      {
        following: userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
        }
      }
    );
  } catch (error) {
    await authCheck(error);
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
    console.log(error, "fail-update");
    await authCheck(error);
  }
};
