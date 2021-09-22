import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { confOneReducer } from "./reducer/confoneReducer";
import {
  getSegmentIdReducer,
  getSegmentReducer,
} from "./reducer/segmentReducer";
import { userLoginReducer, userRegisterReducer } from "./reducer/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  segmentList: getSegmentReducer,
  modelData: confOneReducer,
  segmentId: getSegmentIdReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const modelDataFromStorage = localStorage.getItem("modelData")
  ? JSON.parse(localStorage.getItem("modelData"))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  modelDataa: { modelInfo: modelDataFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
