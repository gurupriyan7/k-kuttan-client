import axios from "axios";
import { appConfig } from "../config/appConfig";
import { authCheck, getLocalStorageItem } from "../utils/appUtils";
import { path } from "../paths/paths";

const API = axios.create({ baseURL: appConfig.apiUrl });

// export const userChats=(id)=>API.

export const getUserChats = async (isRoom) => {
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    return await API.get(`/chat?isRoom=${isRoom}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};
export const findChatById = async (chatId,isRoom) => {
  // alert(chatId  )
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    const data = await API.get(`/chat/user/${chatId}?isRoom=${isRoom}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
    return data?.data;
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};
export const getUserMessages = async (chatId, isRoom) => {
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    return await API.get(`/message/${chatId}?isRoom=${isRoom}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};
export const findRoomMessages = async (chatId) => {
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    return await API.get(`/message/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};

export const createUserChat = async (chatData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `chat`,
      {
        ...chatData
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
        }
      }
    );
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};

export const createMessage = async (messageData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `message`,
      {
        ...messageData
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
        }
      }
    );
  } catch (error) {
    await authCheck(error)
    console.log(error);
  }
};
