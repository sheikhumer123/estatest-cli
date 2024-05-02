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

export const dispatch_ExamLinks = examlinks => dispatch => {
  dispatch({
    type: EXAM_LINKS,
    payload: examlinks,
  });
};

export const dispatch_TermLinks = termsLinks => dispatch => {
  dispatch({
    type: TERMS_LINKS,
    payload: termsLinks,
  });
};

export const dispatch_AllRemainders = allRemainders => dispatch => {
  dispatch({
    type: All_REMAINDERS,
    payload: allRemainders,
  });
};

export const dispatchTime_Stamp = logIn => dispatch => {
  dispatch({
    type: TIME_STAMP,
    payload: logIn,
  });
};
export const dispatchIsLogIn = logIn => dispatch => {
  dispatch({
    type: IS_LOG_IN,
    payload: logIn,
  });
};
export const dispatchDays = days => dispatch => {
  dispatch({
    type: DAYS,
    payload: days,
  });
};
export const dispatchReminderTime = time => dispatch => {
  dispatch({
    type: REMINDER_TIME,
    payload: time,
  });
};
export const dispatchReminderSelectedDays = rdays => dispatch => {
  dispatch({
    type: REMINDER_SELECTED_DAYS,
    payload: rdays,
  });
};
export const dispatchReminderDaysData = data => dispatch => {
  dispatch({
    type: REMINDER_DAYS_DATA,
    payload: data,
  });
};
export const dispatchUserDetails = data => dispatch => {
  dispatch({
    type: USER_DETAILS,
    payload: data,
  });
};
export const dispatchIsPremiumUser = data => dispatch => {
  dispatch({
    type: IS_PREMIUM_USER,
    payload: data,
  });
};
export const dispatchPracticeStates = data => dispatch => {
  dispatch({
    type: PRACTICE_STATES,
    payload: data,
  });
};
export const dispatchQuizStates = data => dispatch => {
  dispatch({
    type: QUIZ_STATES,
    payload: data,
  });
};
export const dispatchLanguage = data => dispatch => {
  dispatch({
    type: LANGUAGE,
    payload: data,
  });
};
export const dispatchTutorial = data => dispatch => {
  dispatch({
    type: TUTORIAL,
    payload: data,
  });
};
