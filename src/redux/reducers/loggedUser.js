import consts from '../consts';

export default function(state = null, action) {
  switch (action.type) {
    case consts.SET_LOGGED_USER:
      return action.loggedUser? action.loggedUser: null
    case consts.LOG_OUT:
      return null
    default:
      return state;
  }
}