import { combineReducers } from 'redux';

import loggedUser from './loggedUser';
import users from './users';
import polls from './polls';


export default combineReducers({
  users,
  loggedUser,
  polls,
});
