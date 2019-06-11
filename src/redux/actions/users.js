import consts from '../consts';

export function loadInitialUsers(users){
	return {
    	type: consts.SET_INITAL_USERS,
      	users
    }
}