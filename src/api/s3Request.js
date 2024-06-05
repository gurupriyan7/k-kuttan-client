import axios from "axios";
import { getLocalStorageItem } from "../utils/appUtils";
import { appConfig } from "../config/appConfig";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getPreSignedUrl = async (fileData) => {
  try {
    const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `s3url`,
      {
        ...fileData
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
