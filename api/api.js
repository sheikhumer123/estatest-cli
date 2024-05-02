import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const API_BASE = 'https://api.estatest.me/api';
axios.interceptors.request.use(
  async config => {
    const tokenToken = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${tokenToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getQuizQuestions = async () => {
  return axios
    .get(API_BASE + '/user-exams/exam')
    .then(response => response.data)
    .catch(e => {});
};

export const getPemium = async data => {
  return axios
    .post('https://api.estatest.me/api/users/premium', data)
    .then(response => response.data)
    .catch(e => {
      console.log(e);
      // return e;
      // console.log('🚀 ~ file: api.js:24 ~ getQuizQuestions ~ e:', e.response);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.faildToLoad'));
    });
};
export const deletePremium = async () => {
  return axios
    .delete(API_BASE + '/api/users/premium')
    .then(response => response.data)
    .catch(e => {
      // return e;
      // console.log('🚀 ~ file: api.js:24 ~ getQuizQuestions ~ e:', e.response);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.faildToLoad'));
    });
};
// getting practice exam questions
export const getPracticeQuestions = async () => {
  return axios
    .get(API_BASE + '/user-exams/practice')
    .then(response => response.data)
    .catch(e => {
      // console.log('🚀 ~ file: api.js:35 ~ getPracticeQuestions ~ e:', e);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.faildToLoad'));
    });
};
// submit quiz
export const submitQuiz = async (data, token) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };

  return fetch(
    'https://api.estatest.me/api/user-exams/exam/submit',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log({'result---': result});
      return result;
    })
    .catch(error => console.log('error', error));
};
// submit practice
export const submitPractice = async data => {
  return axios
    .post(API_BASE + '/user-exams/practice/submit', data)
    .then(response => {
      console.log('response practice', response.data);
      return response;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:80 ~ submitPractice ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedToSubmit'));
    });
};

export const updateUserDetails = async data => {
  return axios
    .post(API_BASE + '/users', data)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:101 ~ updateUserDetails ~ e:', e);
      Alert.alert('Estatest', t('overAll.failedUseInformation'));
    });
};
// deleting user
export const deleteUserAccount = async id => {
  return axios
    .delete(API_BASE + '/users', id)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};
// getting user details
export const getUserDetails = async () => {
  return axios
    .get(API_BASE + '/users')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:93 ~ getUserDetails ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedGetInfo'));
    });
};

export const signUpUser = async () => {
  return axios
    .get(API_BASE + '/users')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:93 ~ getUserDetails ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedGetInfo'));
    });
};
// resources
export const getResources = async () => {
  return axios
    .get(API_BASE + '/resources')
    .then(response => {
      console.log('🚀 ~ file: api.js:114 ~ .then ~ response:', response);
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:106 ~ getResources ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};
// Update to premium
export const updateToPremium = async data => {
  return axios
    .put(API_BASE + '/admin/update/premium', data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ updateToPremium ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};
// getting quiz statistics
export const getQuizStatistics = async () => {
  return axios
    .get(API_BASE + '/user-exams/exam/statistics')
    .then(response => response.data)
    .catch(e => {
      console.log('🚀 ~ file: api.js:45 ~ getQuizStatistics ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadPractceQuiz'));
    });
};
// PRACTICE STATISTICS
export const getPracticeStatistics = async () => {
  return axios
    .get(API_BASE + '/user-exams/practice/statistics')
    .then(response => {
      // console.log("🚀 ~ file: api.js:173 ~ getPracticeStatistics ~ response:", response.data)
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ updateToPremium ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};
// update user profile image
export const updateUserProfileImage = async data => {
  return axios
    .post(API_BASE + '/users/uploadProfilePicture', data)
    .then(response => {
      // console.log("🚀 ~ file: api.js:173 ~ getPracticeStatistics ~ response:", response.data)
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ updateToPremium ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};

export const setRemainder = async data => {
  return axios
    .post(API_BASE + '/reminder', data)
    .then(response => {
      // console.log("🚀 ~ file: api.js:173 ~ getPracticeStatistics ~ response:", response.data)
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ setRemainder ~ e:', e);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};

export const getAllRemainders = async () => {
  return axios
    .get(API_BASE + '/reminder')
    .then(response => {
      // console.log("🚀 ~ file: api.js:173 ~ getPracticeStatistics ~ response:", response.data)
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ getAllRemainders ~ e:', e);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};

export const deleteAllRemainders = async () => {
  return axios
    .delete(API_BASE + '/reminder')
    .then(response => {
      // console.log("🚀 ~ file: api.js:173 ~ getPracticeStatistics ~ response:", response.data)
      return response.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:163 ~ deleteAllRemainders ~ e:', e);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedLoadResources'));
    });
};
