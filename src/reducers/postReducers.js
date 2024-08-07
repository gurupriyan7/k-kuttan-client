const postReducer = (
  state = {
    posts: {
      data: [],
      totalCount: 0,
    },
    post: {},
    postSeq: [],
    seqPosts: {
      data: [],
      totalCount: 0,
    },
    loading: false,
    error: false,
    uploading: false,
    isSuccess: false,
    isUploaded: false,
  },
  action
) => {
  console.log("aAction", action.type);
  console.log("stateS", state.posts);
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
        isUploaded: true,
      };
    case "UPLOAD_FAILED":
      return {
        ...state,
        uploading: false,
        error: true,
        isSuccess: false,
        isUploaded: false,
      };
    case "FETCH_START":
      return { ...state, error: false, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.data,
        isSuccess: true,
      };
    case "FETCH_SUCCESS_NEXT_PAGE":
      return {
        ...state,
        loading: false,
        // posts: [...state.posts, ...action.data],
        posts: {data:[...state.posts.data, ...action.data.data], totalCount: action.data.totalCount},
        isSuccess: true,
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
        isSuccess: true,
      };
    case "FETCH_POST_FAILED":
      return { ...state, loading: false, error: true, isSuccess: false };
    case "FETCH_SEQ_START":
      return { ...state, error: false, loading: true };
    case "FETCH_SEQ_SUCCESS":
      return {
        ...state,
        loading: false,
        postSeq: action?.data,
        isSuccess: true,
      };
    case "FETCH_SEQ_FAILED":
      return { ...state, loading: false, error: true, isSuccess: false };
    case "FETCH_SEQ_POST_START":
      return { ...state, error: false, loading: true };
    case "FETCH_SEQ_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        seqPosts: action?.data,
        isSuccess: true,
      };
    case "FETCH_SEQ_POST_SUCCESS_NEXT_PAGE":
      return {
        ...state,
        loading: false,
        seqPosts: {data:[...state.seqPosts.data, ...action.data.data], totalCount: action.data.totalCount},
        isSuccess: true,
      };
    case "FETCH_SEQ_POST_FAILED":
      return { ...state, loading: false, error: true, isSuccess: false };
    default:
      return state;
  }
};

export default postReducer;
