import axios from "axios";
import {
  SEGMENT_GET_FAIL,
  SEGMENT_GET_REQUEST,
  SEGMENT_GET_SUCCESS,
  SEGMENT_ID_GET_FAIL,
  SEGMENT_ID_GET_REQUEST,
  SEGMENT_ID_GET_SUCCESS,
} from "../constants/segmentConstants";

export const getSegmentList = () => async (dispatch) => {
  try {
    dispatch({
      type: SEGMENT_GET_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //destructuring original => res.data
    const { data } = await axios.post(
      "http://localhost:9090/api/vehicles/getSegment"
      // { username: username, password: password },
      // config
    );

    dispatch({
      type: SEGMENT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEGMENT_GET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSegmentId = (segName) => async (dispatch) => {
  try {
    dispatch({
      type: SEGMENT_ID_GET_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //destructuring original => res.data
    const { data } = await axios.post(
      "http://localhost:9090/api/vehicles/postSeggName",
      { name: segName },
      config
    );

    dispatch({
      type: SEGMENT_ID_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEGMENT_ID_GET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
