import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userChannelReducer from './userChannelReducer';
import userReducer from './userReducer';
import likeReducer from './likeReducer';
import favouriteReducer from './favouriteReducer';
import watchLaterReducer from './watchLaterReducer';

const reducers = combineReducers({
    isLogin: loginReducer,
    user: userReducer,
    userChannel : userChannelReducer,
    isLiked : likeReducer,
    isFavourite: favouriteReducer,
    isWatchLater: watchLaterReducer,
})

export default reducers;