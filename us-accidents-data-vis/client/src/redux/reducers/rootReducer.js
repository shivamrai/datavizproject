import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import userReducer from './userReducer';

export default combineReducers({
  notesReducer,
  userReducer,
});


// If a page is refreshed, a new redux instance is created which will not have any user login infor
// Need to use something related to cookies