import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userChannelReducer from './userChannelReducer';

const reducers = combineReducers({
    user: loginReducer,
    userChannel : userChannelReducer
})

export default reducers;