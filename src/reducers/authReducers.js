// import { toast } from "react-toastify";

const authReducer = (
  state = {
    authData: null,
    adminData: null,
    isLoading: false,
    error: null,
    isError: false,
    users: [],
    availableChatUsers: []
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, isError: false };

    case "AUTH_SUCCESS":
      // console.log(action?.data,"action.data");
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem("token", JSON.stringify(action?.data?.data?.token));

      return {
        ...state,
        authData: action.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "ADMIN_AUTH_FAIL":
      return { ...state, isLoading: false, isError: true, error: action?.data };
    case "ADMIN_AUTH_START":
      return { ...state, isLoading: true, isError: false };

    case "ADMIN_AUTH_SUCCESS":
      // console.log(action?.data,"action.data");
      localStorage.setItem(
        "admin-profile",
        JSON.stringify({ ...action?.data })
      );
      localStorage.setItem(
        "admin-token",
        JSON.stringify(action?.data?.data?.token)
      );

      return {
        ...state,
        adminData: action.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "AUTH_FAIL":
      return { ...state, isLoading: false, isError: true, error: action?.data };

    case "ALL_USERS_START":
      return { ...state, isLoading: true, isError: false };

    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        users: action?.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "ALL_USERS_FAIL":
      return { ...state, isLoading: false, isError: true, error: action?.data };
    case "ALL_CHAT_USERS_START":
      return { ...state, isLoading: true, isError: false };

    case "ALL_CHAT_USERS_SUCCESS":
      return {
        ...state,
        availableChatUsers: action?.data,
        isLoading: false,
        isError: false,
        error: null
      };

    case "ALL_CHAT_USERS_FAIL":
      return { ...state, isLoading: false, isError: true, error: action?.data };

    case "UPDATING_START":
      return { ...state, isLoading: true, isError: false };

    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // localStorage.setItem("token", action?.data?.token);
      return {
        ...state,
        isLoading: false,
        isError: false,
        authData: action.data
      };

    case "UPDATING_FAIL":
      return { ...state, isLoading: false, isError: true };
    case "FOLLOW_UNFOLLOW_START":
      return { ...state, isLoading: true, isError: false };

    case "FOLLOW_UNFOLLOW_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // localStorage.setItem("token", action?.data?.data?.token);
      return {
        ...state,
        isLoading: false,
        isError: false,
        authData: action.data
      };

    case "FOLLOW_UNFOLLOW_FAIL":
      return { ...state, isLoading: false, isError: true };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data]
          }
        }
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              )
            ]
          }
        }
      };
    case "PROFILE_START":
      return { ...state, isLoading: true, isError: false };

    case "PROFILE_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      // console.log(action?.data,"actionDAta");
      return {
        ...state,
        isLoading: false,
        isError: false,
        authData: action.data,
        error: null
      };
    case "PROFILE_FAIL":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action?.data
      };
    case "LOGOUT":
      localStorage.removeItem("profile");
      localStorage.removeItem("token");

      return { ...state, authData: null, isLoading: false, isError: false };
    case "ADMIN_LOGOUT":
      localStorage.removeItem("admin-profile");
      localStorage.removeItem("admin-token");

      return { ...state, adminData: null, isLoading: false, isError: false };

    default:
      return state;
  }
};

export default authReducer;
