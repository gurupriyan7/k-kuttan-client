import * as ChatApi from "../api/chatRequest";

export const findUserChats = (isRoom) => async (dispatch) => {
  dispatch({ type: "CHATS_START" });
  try {
    const { data } = await ChatApi.getUserChats(isRoom);
    dispatch({ type: "CHATS_SUCCESS", data: data });
  } catch (error) {
    console.log(error?.message, "chats fetching fail");
    dispatch({ type: "CHATS_FAIL", data: error?.response?.data });
  }
};

export const createUserChat = (chatData) => async (dispatch) => {
  dispatch({ type: "CHAT_CREATE_START" });
  try {
    const { data } = await ChatApi.createUserChat(chatData);
    dispatch({ type: "CHAT_CREATE_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "errorrorro");
    dispatch({ type: "CHAT_CREATE_FAILED", data: error?.response?.data });
  }
};
export const createMessage = (messageData) => async (dispatch) => {
  dispatch({ type: "MESSAGES_START" });
  try {
    const { data } = await ChatApi.createMessage(messageData);
    dispatch({ type: "MESSAGES_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "errorrorro");
    dispatch({ type: "MESSAGES_FAILED", data: error?.response?.data });
  }
};

export const findUserMessages = (chatId,isRoom) => async (dispatch) => {
  dispatch({ type: "CHAT_START" });
  try {
    const { data } = await ChatApi.getUserMessages(chatId,isRoom);
    dispatch({ type: "CHAT_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "chats fetching fail");
    dispatch({ type: "CHAT_FAIL", data: error?.response?.data });
  }
};
export const findRoomMessages = (chatId) => async (dispatch) => {
  dispatch({ type: "CHAT_START" });
  try {
    const { data } = await ChatApi.getUserMessages(chatId);
    dispatch({ type: "CHAT_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "chats fetching fail");
    dispatch({ type: "CHAT_FAIL", data: error?.response?.data });
  }
};
