import { CONF_SET_MODEL_DATA } from "../constants/confOneConstants";

export const saveModelData = (data) => (dispatch) => {
  dispatch({
    type: CONF_SET_MODEL_DATA,
    payload: data,
  });
  localStorage.setItem("modelInfo", JSON.stringify(data));
};
