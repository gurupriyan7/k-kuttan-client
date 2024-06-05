const postReducer = (
  state = {
    posts: [],
    post: {},
    loading: false,
    error: false,
    uploading: false,
    isSuccess: false,
    isUploaded: false
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
        isSuccess: true,
        isUploaded: true
      };
    case "UPLOAD_FAILED":
      return {
        ...state,
        uploading: false,
        error: true,
        isSuccess: false,
        isUploaded: false
      };
    case "FETCH_START":
      return { ...state, error: false, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [action.data],
        isSuccess: true
      };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: true, isSuccess: false };
    case "FETCH_POST_START":
      return { ...state, error: false, loading: true };
    case "FETCH_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        post: action?.data,
        isSuccess: true
      };
    case "FETCH_POST_FAILED":
      return { ...state, loading: false, error: true, isSuccess: false };
    default:
      return state;
  }
};

export default postReducer;
