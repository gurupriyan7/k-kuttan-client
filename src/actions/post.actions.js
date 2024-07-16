import * as PostApi from "../api/postRequest";

export const getAllPosts = async (category,searchText, dispatch,  page = 1, limit = 5) => {
  console.log("calling");
  dispatch({ type: "FETCH_START" });
  try {
    const { data } = await PostApi.getAllPosts(category,searchText,page,limit);
    console.log("FetchData",data.data.data)
    dispatch({ type: page===1?"FETCH_SUCCESS":"FETCH_SUCCESS_NEXT_PAGE", data: data?.data.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_FAILED", data: error?.response?.data });
  }
};
export const getSeqencePosts = (postId,category,searchText) => async (dispatch) => {
  console.log("calling");
  dispatch({ type: "FETCH_SEQ_POST_START" });
  try {
    const { data } = await PostApi.getSeqencePosts(postId,category,searchText);
    dispatch({ type: "FETCH_SEQ_POST_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_SEQ_POST_FAILED", data: error?.response?.data });
  }
};
export const getPostSeqwnces = () => async (dispatch) => {
  console.log("calling");
  dispatch({ type: "FETCH_SEQ_START" });
  try {
    const { data } = await PostApi.getPostSeqwnces()
    console.log(data,"seq-data");
    dispatch({ type: "FETCH_SEQ_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_SEQ_FAILED", data: error?.response?.data });
  }
};
export const getPostsByUser = (isDraft,category,searchText) => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  try {
    const { data } = await PostApi.getPostsByUser(isDraft,category,searchText);
    dispatch({ type: "FETCH_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_FAILED", data: error?.response?.data });
  }
};export const getPostsByUserId= (authorId,searchText) => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  try {
    const { data } = await PostApi.getPostsByUserId(authorId,searchText);
    dispatch({ type: "FETCH_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_FAILED", data: error?.response?.data });
  }
};
export const getPostById = (postId) => async (dispatch) => {
  // export const getPostById = async (postId ,dispatch) => {
  dispatch({ type: "FETCH_POST_START" });
  try {
    const { data } = await PostApi.getPostById(postId); // Assuming there's a method like getPostById in your API
    dispatch({ type: "FETCH_POST_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error, "errorrorrosss");
    dispatch({ type: "FETCH_POST_FAILED", data: error?.response?.data });
  }
};

export const createPost = (postData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const { data } = await PostApi.createPost(postData);
    dispatch({ type: "UPLOAD_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "errorrorro");
    dispatch({ type: "UPLOAD_FAILED", data: error?.response?.data });
  }
};
export const addComment = (postData) => async (dispatch) => {
  dispatch({ type: "COMMENT_START" });
  try {
    const { data } = await PostApi.commentPost(postData);
    dispatch({ type: "COMMENT_SUCCESS", data: data?.data });
  } catch (error) {
    console.log(error?.message, "errorrorro");
    dispatch({ type: "COMMENT_FAILED", data: error?.response?.data });
  }
};
