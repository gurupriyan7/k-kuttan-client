// import { toast } from "react-toastify";

const chatReducer = (
  state = {
    chat: null,
    chats: [],
    messages: [],
    isLoading: false,
    error: null,
    isError: false
  },
  action
) => {
  switch (action.type) {
    case "CHATS_START":
      return { ...state, isLoading: true, isError: false };

    case "CHATS_SUCCESS":
      return {
        ...state,
        chats: action.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "CHATS_FAIL":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, isLoading: false, isError: true, error: action?.data };

    case "CHAT_CREATE_START":
      return { ...state, isLoading: true, isError: false };

    case "CHAT_CREATE_SUCCESS":
      return {
        ...state,
        chats: [...state.chats, action.data],
        isLoading: false,
        isError: false,
        error: null
      };

    case "CHAT_CREATE_FAILED":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, isLoading: false, isError: true, error: action?.data };

    case "CHAT_START":
      return { ...state, isLoading: true, isError: false };

    case "CHAT_SUCCESS":
      return {
        ...state,
        messages: action.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "CHAT_FAIL":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, isLoading: false, isError: true, error: action?.data };
    case "MESSAGES_START":
      return { ...state, isLoading: true, isError: false };

    case "MESSAGES_SUCCESS":
      console.log(
        action?.data,
        "action data message",
        Array.isArray(state.messages),
        "state mess",
        state.messages
      );
      return {
        ...state,
        messages: Array.isArray(state.messages)
          ? [...state.messages, action.data]
          : [action.data],
        isLoading: false,
        isError: false,
        error: null
      };

    case "MESSAGES_FAIL":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, isLoading: false, isError: true, error: action?.data };

    default:
      return state;
  }
};

export default chatReducer;
