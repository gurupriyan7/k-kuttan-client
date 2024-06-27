import axios from "axios";
import { appConfig } from "../config/appConfig";
import { authCheck, getLocalStorageItem } from "../utils/appUtils";
import { path } from "../paths/paths"; // Assuming you have this utility function

const API = axios.create({ baseURL: appConfig.apiUrl });

const getToken = (isAdmin = false) => {
  if (isAdmin) {
    return getLocalStorageItem("admin-token");
  } else {
    return getLocalStorageItem("token");
  }
};

// Fetch all rooms
export const  getAllRooms = async ({ isAdmin = false }) => {
  try {
    const token = getToken(isAdmin);
    console.log(token,"tokensss");
    const response = await API.get("/room", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // await authCheck(error,true);
    console.error("Error fetching all rooms:", error);
  }
};

// Fetch user-specific rooms
export const getUserRooms = async () => {
  try {
    console.log("TESRR");
    const token = getToken();
    const userData = getLocalStorageItem("profile");

    // if (!userData) {
    //   window.location.href = path.auth;
    // }

    const response = await API.get(`/room/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user rooms:", error);
    // await authCheck(error)
  }
};

// Create a new room
export const createRoom = async (roomData) => {
  try {
    const token = getToken(true);
    const response = await API.post("/room", roomData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    await authCheck(error,true);
  }
};

// Join a room
export const joinRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/join/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error joining room:", error);
    await authCheck(error);
  }
};

// Leave a room
export const leaveRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/leave/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error leaving room:", error);
    await authCheck(error);
  }
};

// Delete a room
export const deleteRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/delete/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    await authCheck(error);
  }
};
