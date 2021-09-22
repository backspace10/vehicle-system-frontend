import {
  SEGMENT_GET_FAIL,
  SEGMENT_GET_REQUEST,
  SEGMENT_GET_SUCCESS,
  SEGMENT_ID_GET_FAIL,
  SEGMENT_ID_GET_REQUEST,
  SEGMENT_ID_GET_SUCCESS,
} from "../constants/segmentConstants";

export const getSegmentReducer = (state = {}, action) => {
  switch (action.type) {
    case SEGMENT_GET_REQUEST:
      return { loading: true };

    case SEGMENT_GET_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case SEGMENT_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getSegmentIdReducer = (state = {}, action) => {
  switch (action.type) {
    case SEGMENT_ID_GET_REQUEST:
      return { loading: true };

    case SEGMENT_ID_GET_SUCCESS:
      return { loading: false, segmentId: action.payload };

    case SEGMENT_ID_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
