import axios from "axios";
import { authCheck, getLocalStorageItem } from "../utils/appUtils";
import { appConfig } from "../config/appConfig";
import { path } from "../paths/paths";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getSeqencePosts = async (postId, category, searchText, page = 1, limit = 10) => {
  try {
    const token = getLocalStorageItem("token");

    return await API.get(`/post/seq/${postId}?searchTerm=${searchText ?? ""}${category && `&category=${category}`}&page=${page}&limit=${limit}`, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllPosts = async (category, searchText, page = 1, limit = 20) => {
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    return await API.get(
      `/post?searchTerm=${searchText ?? ""}${category ? `&category=${category}` : ""}&page=${page}&limit=${limit}`, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostSeqwnces = async () => {
  try {
    const token = getLocalStorageItem("token");

    return await API.get(`/post/post-seq`, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsByUser = async (isDraft, category, searchText, page, limit) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;
    return await API.get(
      `/post/user?isDraft=${isDraft}&searchTerm=${searchText ?? ""}${category && `&category=${category}`}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getPostsByUserId = async (authorId, searchText, page, limit) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;
    return await API.get(
      `/post/user/${authorId}?searchTerm=${searchText ?? ""}&page=${page}&limit=${limit}`,
      {
        ...(token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getPostById = async ({ postId }) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;
    return await API.get(`/post/${postId}`, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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
        like: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      }
    );
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
export const commentPost = async ({ id, comment, commentType = "main", commentId = undefined }) => {
  try {
    const token = getLocalStorageItem("token");

    return await API.patch(
      `post/user/${id}`,
      {
        comment: comment, commentType, commentId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    await authCheck(error);
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
        ...postData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      }
    );
  } catch (error) {
    await authCheck(error);
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
        ...paymentData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      }
    );
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};

export const updatePost = async (id, userData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.patch(
      `post/${id}`,
      {
        ...userData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      }
    );
  } catch (error) {
    await authCheck(error);
    console.log(error);
  }
};
