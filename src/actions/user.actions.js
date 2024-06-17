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
