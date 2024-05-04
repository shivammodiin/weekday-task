import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
} from "./types";

const initialState = {
  postsData: [],
  loading: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        postsData: [...state.postsData, ...action.payload],
        loading: false,
      };
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default postsReducer;
