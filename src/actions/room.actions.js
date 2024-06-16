import * as RoomApi from "../api/RoomRequest";

export const findAllRooms = () => async (dispatch) => {
  dispatch({ type: "ALL_ROOMS_START" });
  try {
    const data = await RoomApi.getAllRooms();
    dispatch({ type: "ALL_ROOMS_SUCCESS", data:data?.data });
  } catch (error) {
    console.log(error.message, "all rooms fetching fail");
    dispatch({ type: "ALL_ROOMS_FAIL", data: error.response.data });
  }
};

// Action to find user rooms
export const findUserRooms = () => async (dispatch) => {
  dispatch({ type: "USER_ROOMS_START" });
  try {
    const data = await RoomApi.getUserRooms();
    console.log(data,"USER DATA3")
    dispatch({ type: "USER_ROOMS_SUCCESS", data:data?.data });
  } catch (error) {
    console.log(error.message, "user rooms fetching fail");
    dispatch({ type: "USER_ROOMS_FAIL", data: error.response.data });
  }
};

// Action to create a new room
export const createRoomAction = (roomData) => async (dispatch) => {
  dispatch({ type: "CREATE_ROOM_START" });
  try {
    const data = await RoomApi.createRoom(roomData);
    dispatch({ type: "CREATE_ROOM_SUCCESS", data:data?.data });
  } catch (error) {
    console.log(error, "create room fail");
    dispatch({ type: "CREATE_ROOM_FAIL", data: error?.response?.data });
  }
};

// Action to join a room
export const joinRoomAction = (roomId) => async (dispatch) => {
  dispatch({ type: "JOIN_ROOM_START" });
  try {
    const data = await RoomApi.joinRoom(roomId);
    dispatch({ type: "JOIN_ROOM_SUCCESS", data:data?.data });
  } catch (error) {
    console.log(error.message, "join room fail");
    dispatch({ type: "JOIN_ROOM_FAIL", data: error.response.data });
  }
};

// Action to leave a room
export const leaveRoomAction = (roomId) => async (dispatch) => {
  dispatch({ type: "LEAVE_ROOM_START" });
  try {
    const data = await RoomApi.leaveRoom(roomId);
    dispatch({ type: "LEAVE_ROOM_SUCCESS", data });
  } catch (error) {
    console.log(error.message, "leave room fail");
    dispatch({ type: "LEAVE_ROOM_FAIL", data: error.response.data });
  }
};

// Action to delete a room
export const deleteRoomAction = (roomId) => async (dispatch) => {
  dispatch({ type: "DELETE_ROOM_START" });
  try {
    const data = await RoomApi.deleteRoom(roomId);
    dispatch({ type: "DELETE_ROOM_SUCCESS", data });
  } catch (error) {
    console.log(error.message, "delete room fail");
    dispatch({ type: "DELETE_ROOM_FAIL", data: error.response.data });
  }
};
