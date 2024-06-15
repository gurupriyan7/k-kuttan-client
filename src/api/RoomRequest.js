import axios from "axios";
import { appConfig } from "../config/appConfig";
import { getLocalStorageItem } from "../utils/appUtils";
import { path } from "../paths/paths"; // Assuming you have this utility function

const API = axios.create({ baseURL: appConfig.apiUrl  });

const getToken = () => {
  return getLocalStorageItem("token");
};

// Fetch all rooms
export const getAllRooms = async () => {
  try {
    const token = getToken();
    const response = await API.get("/room", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    throw error;
  }
};

// Fetch user-specific rooms
export const getUserRooms = async () => {
  try {
    console.log("TESRR")
    const token = getToken();
    const userData = getLocalStorageItem("profile");

    
    // if (!userData) {
    //   window.location.href = path.auth;
    // }

    const response = await API.get(`/room/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user rooms:", error);
    throw error;
  }
};

// Create a new room
export const createRoom = async (roomData) => {
  try {
    const token = getToken();
    const response = await API.post("/room", roomData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

// Join a room
export const joinRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/join/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};

// Leave a room
export const leaveRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/leave/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error leaving room:", error);
    throw error;
  }
};

// Delete a room
export const deleteRoom = async (roomId) => {
  try {
    const token = getToken();
    const response = await API.patch(`/room/delete/${roomId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};