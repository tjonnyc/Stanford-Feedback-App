// Import libraries
import { AsyncStorage } from 'react-native';

// Import other actions
import { sendGoogleAnalytics } from './actions_user';

// Import action types
import {
  RECEIVED_SOLUTION_LIST,
  SUBMITTING_SOLUTION,
  SUBMIT_SOLUTION_SUCCESS,
  SUBMIT_SOLUTION_FAIL,
  ADD_SOLUTION_TO_STATE,
  ADD_SOLUTION_UPVOTE,
  ADD_SOLUTION_DOWNVOTE,
  REMOVE_SOLUTION_UPVOTE,
  REMOVE_SOLUTION_DOWNVOTE,
  SOLUTION_CHANGED,
  AUTHORIZE_USER_FAIL,
} from './types';

// Import constants
import { http, ROOT_STORAGE } from '../constants';
import errorHandling from '../errorHandling';

export const pullSolutions = token => (
  (dispatch) => {
    http.post('/pullSolutions', { authorization: token })
    .then(response => dispatch({ type: RECEIVED_SOLUTION_LIST, payload: response.data }))
    .catch(error => errorHandling(error, 'pullSolutions()'));
  }
);

export const submitSolutionToServer = (text, feedbackId, solutionsRequireApproval) => (
  (dispatch, getState) => {
    const token = getState().auth.token;
    let solution = { text, feedbackId };

    dispatch({ type: SUBMITTING_SOLUTION });
    http.post('/submitSolution', { solution, authorization: token })
    .then((response) => {
      dispatch({ type: SUBMIT_SOLUTION_SUCCESS });
      dispatch(sendGoogleAnalytics('Submit Solution', feedbackId));

      solution = {
        id: response.data.id,
        feedbackId,
        text,
        upvotes: 0,
        downvotes: 0,
        approved: !solutionsRequireApproval,
      };
      if (!solutionsRequireApproval) {
        dispatch({ type: ADD_SOLUTION_TO_STATE, payload: solution });
      }
      dispatch(addSolutionUpvote(solution));
    })
    .catch(error => errorHandling(error, 'submitSolutionToServer()'));
  }
);

export const addSolutionUpvote = solution => (
  (dispatch, getState) => {
    dispatch({ type: ADD_SOLUTION_UPVOTE, payload: solution });
    const { solutionUpvotes, solutionDownvotes } = getState().user;
    AsyncStorage.setItem(`${ROOT_STORAGE}solutionUpvotes`, JSON.stringify(solutionUpvotes));

    // If downvote exists remove it
    if (solutionDownvotes.includes(solution.id)) {
      dispatch(removeSolutionDownvote(solution));
    }

    const token = getState().auth.token;
    http.post('/submitSolutionVote', { solution, upvote: 1, downvote: 0, authorization: token })
    .then(() => dispatch(sendGoogleAnalytics('Solution Upvote', solution.feedbackId)))
    .catch(error => errorHandling(error, 'addSolutionUpvote()'));
  }
);

export const addSolutionDownvote = solution => (
  (dispatch, getState) => {
    dispatch({ type: ADD_SOLUTION_DOWNVOTE, payload: solution });
    const { solutionDownvotes, solutionUpvotes } = getState().user;
    AsyncStorage.setItem(`${ROOT_STORAGE}solutionDownvotes`, JSON.stringify(solutionDownvotes));

    // If upvote exists remove it
    if (solutionUpvotes.includes(solution.id)) {
      dispatch(removeSolutionUpvote(solution));
    }

    const token = getState().auth.token;
    http.post('/submitSolutionVote', { solution, upvote: 0, downvote: 1, authorization: token })
    .then(() => dispatch(sendGoogleAnalytics('Solution Downvote', solution.feedbackId)))
    .catch(error => errorHandling(error, 'addSolutionDownvote()'));
  }
);

export const removeSolutionUpvote = solution => (
  (dispatch, getState) => {
    dispatch({ type: REMOVE_SOLUTION_UPVOTE, payload: solution });
    const { solutionUpvotes } = getState().user;
    AsyncStorage.setItem(`${ROOT_STORAGE}solutionUpvotes`, JSON.stringify(solutionUpvotes));

    const token = getState().auth.token;
    http.post('/removeSolutionVote', { solution, upvote: 1, downvote: 0, authorization: token })
    .catch(error => errorHandling(error, 'removeSolutionUpvote()'));
  }
);

export const removeSolutionDownvote = solution => (
  (dispatch, getState) => {
    dispatch({ type: REMOVE_SOLUTION_DOWNVOTE, payload: solution });
    const { solutionDownvotes } = getState().user;
    AsyncStorage.setItem(`${ROOT_STORAGE}solutionDownvotes`, JSON.stringify(solutionDownvotes));

    const token = getState().auth.token;
    http.post('/removeSolutionVote', { solution, upvote: 0, downvote: 1, authorization: token })
    .catch(error => errorHandling(error, 'removeSolutionDownvote()'));
  }
);

export const solutionChanged = solution => (
  {
    type: SOLUTION_CHANGED,
    payload: solution,
  }
);
