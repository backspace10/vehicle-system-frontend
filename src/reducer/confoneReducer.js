import { CONF_SET_MODEL_DATA } from "../constants/confOneConstants";

export const confOneReducer = (state = { modelData: {} }, action) => {
  console.log(action.payload);
  switch (action.type) {
    case CONF_SET_MODEL_DATA:
      return {
        ...state,
        modelData: action.payload,
      };

    default:
      return state;
  }
};
