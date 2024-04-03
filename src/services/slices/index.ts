import { combineReducers } from 'redux';
import burgerReducer from './burger';
import userReducer from './user';
import wsFeedReducer from './feed';
import wsUserFeedReducer from './userFeed';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  feed: wsFeedReducer,
  userFeed: wsUserFeedReducer,
});
