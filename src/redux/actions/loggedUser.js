import consts from '../consts';

export function loadInitialUsers(user = null){
	return {
    	type: consts.SET_LOGGED_USER,
      	loggedUser: user
    }
}

export function loggOut(){
	return {
    	type: consts.LOG_OUT,
      	loggedUser: null
    }
}