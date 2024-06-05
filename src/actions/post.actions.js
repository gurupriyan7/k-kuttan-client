import * as PostApi from "../api/postRequest";

export const getAllPosts = () => async (dispatch) => {

  console.log("calling");
  dispatch({ type: "FETCH_START" });
  try {
    const { data } = await PostApi.getAllPosts();
    dispatch({ type: "FETCH_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_FAILED",data:error?.response?.data });
  }
};
export const getPostsByUser = () => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  try {
    const { data } = await PostApi.getPostsByUser();
    dispatch({ type: "FETCH_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_FAILED",data:error?.response?.data });
  }
};
export const getPostById = (postId) => async (dispatch) => {
  dispatch({ type: "FETCH_POST_START" });
  try {
    const { data } = await PostApi.getPostById(postId); // Assuming there's a method like getPostById in your API
    dispatch({ type: "FETCH_POST_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_POST_FAILED",data:error?.response?.data });
  }
};

export const createPost = (postData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const { data } = await PostApi.createPost(postData);
    dispatch({ type: "UPLOAD_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "errorrorro");
    dispatch({ type: "UPLOAD_FAILED",data:error?.response?.data });
  }
};
