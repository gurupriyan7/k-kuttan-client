import * as UserApi from "../api/userRequest";

export const findUserProfile = () => async (dispatch) => {
  dispatch({ type: "PROFILE_START" });
  try {
    const { data } = await UserApi.getUserProfile()
    dispatch({ type: "PROFILE_SUCCESS", data: data });
  } catch (error) {
    console.log(error?.message, "loginError");
    dispatch({ type: "PROFILE_FAIL", data: error?.response?.data });
  }
};
export const followUnFollowUser = (userId,) => async (dispatch) => {
  dispatch({ type: "FOLLOW_UNFOLLOW_START" });
  try {
    const { data } = await UserApi.followUnFollowUser(userId)
    dispatch({ type: "FOLLOW_UNFOLLOW_SUCCESS", data: data });
  } catch (error) {
    console.log(error?.message, "loginError");
    dispatch({ type: "FOLLOW_UNFOLLOW_FAIL", data: error?.response?.data });
  }
};
export const getAllUsers = (page) => async (dispatch) => {
  dispatch({ type: "ALL_USERS_START" });
  try {
    const { data } = await UserApi.getAllUsers(page)
  console.log(data,"action-data");
    dispatch({ type: "ALL_USERS_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "loginError");
    dispatch({ type: "ALL_USERS_FAIL", data: error?.response?.data });
  }
};
