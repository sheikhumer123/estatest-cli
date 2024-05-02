import {
  IS_LOG_IN,
  REMINDER_DAYS_DATA,
  REMINDER_SELECTED_DAYS,
  REMINDER_TIME,
  USER_DETAILS,
  IS_PREMIUM_USER,
  QUIZ_STATES,
  PRACTICE_STATES,
  LANGUAGE,
  TUTORIAL,
  DAYS,
  TIME_STAMP,
  All_REMAINDERS,
  TERMS_LINKS,
  EXAM_LINKS,
} from './constants';
const initialState = {
  logIn: false,
  reminderTime: null,
  reminderSelectedDays: [],
  reminderDaysData: [],
  userDetails: null,
  isPremiumUser: false,
  quizStatistics: null,
  practiceStatistics: null,
  lang: 'he',
  isTutorial: true,
  days: [],
  time_stamp: '',
  allRemainders: [],
  termsLinks: {},
  examlinks: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case EXAM_LINKS:
      return {
        ...state,
        examlinks: action.payload,
      };
    case TERMS_LINKS:
      return {
        ...state,
        termsLinks: action.payload,
      };
    case All_REMAINDERS:
      return {
        ...state,
        allRemainders: action.payload,
      };
    case TIME_STAMP:
      return {
        ...state,
        time_stamp: action.payload,
      };
    case DAYS:
      return {
        ...state,
        days: action.payload,
      };
    case IS_LOG_IN:
      return {
        ...state,
        logIn: action.payload,
      };
    case REMINDER_SELECTED_DAYS:
      return {
        ...state,
        reminderSelectedDays: action.payload,
      };
    case REMINDER_TIME:
      return {
        ...state,
        reminderTime: action.payload,
      };
    case REMINDER_DAYS_DATA:
      return {
        ...state,
        reminderDaysData: action.payload,
      };
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case IS_PREMIUM_USER:
      return {
        ...state,
        isPremiumUser: action.payload,
      };
    case PRACTICE_STATES:
      return {
        ...state,
        practiceStatistics: action.payload,
      };
    case QUIZ_STATES:
      return {
        ...state,
        quizStatistics: action.payload,
      };
    case LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case TUTORIAL:
      return {
        ...state,
        isTutorial: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
