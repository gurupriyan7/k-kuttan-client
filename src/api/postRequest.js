import axios from "axios";
import { getLocalStorageItem } from "../utils/appUtils";
import { appConfig } from "../config/appConfig";
import { path } from "../paths/paths";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getAllPosts = async () => {
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    return await API.get("/post", {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsByUser = async () => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;
    return await API.get("/post/user", {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostById = async ({ postId }) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;
    return await API.get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeAndCommentPost = async (id, userId) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.patch(
      `post/user/${id}`,
      {
        userId: userId,
        like: true
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
export const commentPost = async (id, comment) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.patch(
      `post/user/${id}`,
      {
        comment: comment
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
export const createPost = async (postData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `post`,
      {
        ...postData
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
export const updatePayment = async (paymentData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `webHook`,
      {
        ...paymentData
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
