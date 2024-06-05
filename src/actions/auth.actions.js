import * as AuthApi from "../api/authRequest";
import * as UserApi from "../api/userRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log(formData, "formdata");
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error, "loginError");
    dispatch({ type: "AUTH_FAIL", data: error?.response?.data });
  }
};
export const AuthorLogin = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log(formData, "formdata");
    const { data } = await AuthApi.AuthorLogin(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error, "loginError");
    dispatch({ type: "AUTH_FAIL", data: error?.response?.data });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL", data: error });
  }
};
export const AuthorSignUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.AuthorSignUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL", data: error });
  }
};
export const updateUser = (formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    console.log(formData, "formDataaa");
    const { data } = await UserApi.updateUser(formData);

    dispatch({ type: "UPDATING_SUCCESS", data: data });
    window.location.reload()
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL", data: error });
  }
};
export const updateAuthor = (formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    console.log(formData, "formDataaa");
    const { data } = await UserApi.updateAuthor(formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
    window.location.reload()

  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL", data: error });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
