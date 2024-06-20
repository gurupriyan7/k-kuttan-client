const initialState = {
  rooms: [],
  room:{},
  userRooms: [],
  loading: false,
  error: null
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_ROOMS_START":
    case "USER_ROOMS_START":
    case "CREATE_ROOM_START":
    case "JOIN_ROOM_START":
    case "LEAVE_ROOM_START":
    case "DELETE_ROOM_START":
      return { ...state, loading: true, error: null };

    case "ALL_ROOMS_SUCCESS":
      return { ...state, rooms: action.data, loading: false };

    case "USER_ROOMS_SUCCESS":
      return { ...state, userRooms: action.data, loading: false };

    case "CREATE_ROOM_SUCCESS":
      console.log(Array.isArray(state.userRooms),"apple",state);
      return {
        ...state,
        userRooms: Array.isArray(state.userRooms)
          ? [...state.userRooms, action.data]
          : [action.data],
        loading: false,
        isError: false,
        error: null
      };
      // return { ...state, rooms: [...state.rooms, action.data], loading: false };

    case "JOIN_ROOM_SUCCESS":
      console.log(action.data,"room log success");
      return {
        ...state,
        userRooms: Array.isArray(state.userRooms)
          ? [...state.userRooms, action.data]
          : [action.data],
        loading: false,
        isError: false,
        error: null
      };

    case "LEAVE_ROOM_SUCCESS":
      return {
        ...state,
        userRooms: state.userRooms.filter(
          (room) => room._id !== action.data._id
        ),
        loading: false
      };

    case "DELETE_ROOM_SUCCESS":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.data._id),
        loading: false
      };

    case "ALL_ROOMS_FAIL":
    case "USER_ROOMS_FAIL":
    case "CREATE_ROOM_FAIL":
    case "JOIN_ROOM_FAIL":
    case "LEAVE_ROOM_FAIL":
    case "DELETE_ROOM_FAIL":
      return { ...state, loading: false, error: action.data };

    default:
      return state;
  }
};

export default roomReducer;
