import * as ChatApi from "../api/chatRequest";

export const findUserChats = () => async (dispatch) => {
  dispatch({ type: "CHATS_START" });
  try {
    const { data } = await ChatApi.getUserChats();
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
