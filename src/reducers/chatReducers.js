// import { toast } from "react-toastify";

const chatReducer = (
  state = {
    chat: null,
    chats: [],
    loading: false,
    error: null,
    isError: false
  },
  action
) => {
  switch (action.type) {
    case "CHATS_START":
      return { ...state, loading: true, isError: false };

    case "CHATS_SUCCESS":
      return {
        ...state,
        chats: action.data,
        loading: false,
        isError: false,
        error: null
      };

    case "CHATS_FAIL":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, loading: false, isError: true, error: action?.data };

    case "CHAT_CREATE_START":
      return { ...state, loading: true, isError: false };

    case "CHAT_CREATE_SUCCESS":
      return {
        ...state,
        chats: [...state.chats, action.data],
        loading: false,
        isError: false,
        error: null
      };

    case "CHAT_CREATE_FAILED":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, loading: false, isError: true, error: action?.data };

    default:
      return state;
  }
};

export default chatReducer;
