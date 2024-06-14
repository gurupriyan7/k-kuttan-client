import axios from "axios";
import { appConfig } from "../config/appConfig";
import { getLocalStorageItem } from "../utils/appUtils";
import { path } from "../paths/paths";

const API = axios.create({ baseURL: appConfig.apiUrl });

// export const userChats=(id)=>API.

export const getUserChats = async () => {
  alert("calling chat");
  try {
    const token = getLocalStorageItem("token");
    const userData = getLocalStorageItem("profile");

    // const token = userData?.data?.token;
    // alert("calling")
    console.log(token, "tokensssss");

    if (!userData) {
      window.location.href = path.auth;
    }
    return await API.get("/chat", {
      headers: {
        Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      }
    });
  } catch (error) {
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
    console.log(error);
  }
};
