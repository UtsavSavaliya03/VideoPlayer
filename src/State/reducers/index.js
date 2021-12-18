import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userChannelReducer from './userChannelReducer';
import userReducer from './userReducer';
import currentVdReducer from './currentVdReducer';

const reducers = combineReducers({
    isLogin: loginReducer,
    user: userReducer,
    userChannel : userChannelReducer,
    currentVd : currentVdReducer,
})

export default reducers;