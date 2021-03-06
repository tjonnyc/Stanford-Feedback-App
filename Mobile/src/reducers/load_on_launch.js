// Import Libraries
import { AsyncStorage } from 'react-native';

// Import actions, reducers, and constants
import store from './store';
import * as actions from '../actions';
import { ROOT_STORAGE } from '../constants';

async function loadToken(token) {
  try {
    store.dispatch(actions.pullFeedback(token));
    store.dispatch(actions.pullSolutions(token));
    store.dispatch(actions.pullGroupInfo(token));
  } catch (error) {
    console.log('Error running loadToken(): ', error);
  }
}

async function loadVotes() {
  try {
    // Feedback Upvotes
    let feedbackUpvotes = await AsyncStorage.getItem(`${ROOT_STORAGE}feedbackUpvotes`) || '[]';
    feedbackUpvotes = JSON.parse(feedbackUpvotes);
    store.dispatch(actions.loadFeedbackUpvotes(feedbackUpvotes));

    // Feedback No Opinions
    let feedbackNoOpinions = await AsyncStorage.getItem(`${ROOT_STORAGE}feedbackNoOpinions`) || '[]';
    feedbackNoOpinions = JSON.parse(feedbackNoOpinions);
    store.dispatch(actions.loadFeedbackNoOpinions(feedbackNoOpinions));

    // Feedback Downvotes
    let feedbackDownvotes = await AsyncStorage.getItem(`${ROOT_STORAGE}feedbackDownvotes`) || '[]';
    feedbackDownvotes = JSON.parse(feedbackDownvotes);
    store.dispatch(actions.loadFeedbackDownvotes(feedbackDownvotes));

    // Solution Upvotes
    let solutionUpvotes = await AsyncStorage.getItem(`${ROOT_STORAGE}solutionUpvotes`) || '[]';
    solutionUpvotes = JSON.parse(solutionUpvotes);
    store.dispatch(actions.loadSolutionUpvotes(solutionUpvotes));

    // Solution Downvotes
    let solutionDownvotes = await AsyncStorage.getItem(`${ROOT_STORAGE}solutionDownvotes`) || '[]';
    solutionDownvotes = JSON.parse(solutionDownvotes);
    store.dispatch(actions.loadSolutionDownvotes(solutionDownvotes));
  } catch (error) {
    console.log('Error running loadVotes(): ', error);
  }
}

async function loadDoNotDisplayList() {
  try {
    let doNotDisplayList = await AsyncStorage.getItem(`${ROOT_STORAGE}doNotDisplayList`) || '[]';
    doNotDisplayList = JSON.parse(doNotDisplayList);
    store.dispatch(actions.loadDoNotDisplayList(doNotDisplayList));
  } catch (error) {
    console.log('Error running loadDoNotDisplayList(): ', error);
  }
}

async function loadInstructions() {
  try {
    let instructionsViewed = await AsyncStorage.getItem(`${ROOT_STORAGE}instructionsViewed`) || '[]';
    instructionsViewed = JSON.parse(instructionsViewed);
    store.dispatch(actions.loadInstructionsViewed(instructionsViewed));
  } catch (error) {
    console.log('Error running loadInstructions(): ', error);
  }
}

async function clearAsyncStorage() {
  try {
    await AsyncStorage.removeItem(`${ROOT_STORAGE}token`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}feedbackUpvotes`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}feedbackDownvotes`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}solutionUpvotes`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}solutionDownvotes`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}doNotDisplayList`);
    await AsyncStorage.removeItem(`${ROOT_STORAGE}instructionsViewed`);
  } catch (error) {
    console.log('Error running clearAsyncStorage(): ', error);
  }
}

// Initialize saved state
const loadOnLaunch = (token) => {
  //clearAsyncStorage();
  loadToken(token);
  loadVotes();
  loadDoNotDisplayList();
  loadInstructions();
};

export default loadOnLaunch;
