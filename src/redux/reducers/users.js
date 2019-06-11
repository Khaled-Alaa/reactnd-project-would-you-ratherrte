import consts from "../consts";

export default function(state = null, action) {
  switch (action.type) {
    case consts.SET_INITAL_USERS:
      return {
        ...state,
        ...action.users
      };
    case consts.ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    case consts.CREATE_QUESTION:
      return {
        ...state,
        [action.q.author]: {
          ...state[action.q.author],
          questions: [...state[action.q.author].questions, action.q.id]
        }
      };
    default:
      return state;
  }
}
