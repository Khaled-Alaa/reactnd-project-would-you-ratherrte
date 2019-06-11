import consts from "../consts";

export default function(state = null, action) {
  switch (action.type) {
    case consts.SET_INITAL_POLLS:
      return {
        ...state,
        ...action.polls
      };
    case consts.ADD_QUESTION:
      return {
        ...state,
        ...action.question
      };
    case consts.ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };
    case consts.CREATE_QUESTION:
      return {
        ...state,
        [action.q.id]: action.q
      };
    default:
      return state;
  }
}
