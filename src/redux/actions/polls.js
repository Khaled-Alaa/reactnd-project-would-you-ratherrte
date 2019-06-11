import consts from "../consts";
import { saveQuestionAnswer, saveQuestion } from "../../api";

export function loadInitialPolls(polls) {
  return {
    type: consts.SET_INITAL_POLLS,
    polls
  };
}

export function answerQuestion(config) {
  return dispatch => {
    return saveQuestionAnswer(config).then(() => {
      dispatch(answerQuestionRedux(config));
    });
  };
}

export function answerQuestionRedux(config) {
  return {
    type: consts.ANSWER_QUESTION,
    ...config
  };
}

export function createQuestion(config) {
  return dispatch => {
    return saveQuestion(config).then(res => {
      dispatch(createQuestionRedux({ q: res }));
    });
  };
}

export function createQuestionRedux(config) {
  return { type: consts.CREATE_QUESTION, ...config };
}
