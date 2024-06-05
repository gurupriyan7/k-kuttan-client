// import { toast } from "react-toastify";

const authReducer = (
  state = { authData: null, loading: false, error: null, isError: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, isError: false };

    case "AUTH_SUCCESS":
      // console.log(action?.data,"action.data");
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem(
        "token",
        JSON.stringify(action?.data?.data?.token )
      );

      return {
        ...state,
        authData: action.data,
        loading: false,
        isError: false,
        error: null
      };

    case "AUTH_FAIL":
      // console.log(action?.data, "fail");
      // toast.error(action?.data?.message);
      return { ...state, loading: false, isError: true, error: action?.data };

    case "UPDATING_START":
      return { ...state, updateLoading: true, isError: false };

    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem("token", action?.data?.data?.token);
      return {
        ...state,
        updateLoading: false,
        isError: false,
        authData: action.data
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, isError: true };

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
      return { ...state, updateLoading: true, isError: false };

    case "PROFILE_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      // console.log(action?.data,"actionDAta");
      return {
        ...state,
        updateLoading: false,
        isError: false,
        authData: action.data,
        error: null
      };
    case "PROFILE_FAIL":
      return {
        ...state,
        updateLoading: false,
        isError: true,
        error: action?.data
      };
    case "LOGOUT":
      localStorage.removeItem("profile");
      localStorage.removeItem("token");

      return { ...state, authData: null, loading: false, isError: false };

    default:
      return state;
  }
};

export default authReducer;
