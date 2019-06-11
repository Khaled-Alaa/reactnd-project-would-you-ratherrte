import {loadInitialUsers} from './users';
import {loadInitialPolls} from './polls';

import {getInitialData} from '../../api'

export function initialData(){
	return dispatch => {
       return getInitialData().then(function ({ users, polls }) {
          dispatch(loadInitialUsers(users));
          dispatch(loadInitialPolls(polls));
        });
   };
}