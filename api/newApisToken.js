import axios from 'axios';
import {t} from 'i18next';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://estatest-backend-theta.vercel.app/v1/';

axios.interceptors.request.use(
  async config => {
    const tokenToken = await AsyncStorage.getItem('token');
    config.headers.Authorization = `${tokenToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const updateUserDetails = async (data, loader) => {
  return axios
    .put(API_BASE + `auth/user/updateUser`, data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e.message);
      loader(false);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response?.data?.message);
      }, 200);
    });
};

export const getUserDetails = async logoutUser => {
  return axios
    .get(API_BASE + 'auth/user/getUserDetails')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      Alert.alert(t('overAll.subserrorTitle'), t('overAll.getInfotitleError'), [
        {
          text: 'OK',
          onPress: () => {
            console.log(123);
            logoutUser && logoutUser();
          },
        },
      ]);
    });
};

export const toggleMarkettingApi = async logoutUser => {
  return axios
    .post(API_BASE + 'auth/user/toggleMarkettingBtn')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      Alert.alert(t('overAll.subserrorTitle'), t('overAll.getInfotitleError'), [
        {
          text: 'OK',
          onPress: () => {
            console.log(123);
            logoutUser && logoutUser();
          },
        },
      ]);
    });
};

export const getQuizQuestions = async () => {
  return axios
    .get(API_BASE + 'quiz/apiquizQuestion')
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const getQuizQuestionsSimple = async () => {
  return axios
    .get(API_BASE + 'quiz/apiquiz')
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const getPracticeQuestions = async () => {
  return axios
    .get(API_BASE + 'practice/getPracticeQuestions')
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const getPracticeQuestionsSimple = async () => {
  return axios
    .get(API_BASE + 'practice/getSimplePracticeQuestions')
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const submitDraftAnswers = async data => {
  return axios
    .post(API_BASE + 'quiz/apiquiz', data)
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const updateRemainTime = async data => {
  return axios
    .post(API_BASE + 'quiz/updateRemainTime', data)
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const getDraft = () => {
  return axios
    .get(API_BASE + `quiz/resumequiz`)
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const deleteDraft = () => {
  return axios
    .delete(API_BASE + `quiz/deletedraft`)
    .then(response => response.data)
    .catch(e => {
      console.log(e);
    });
};

export const nextQuestionDraft = body => {
  return axios
    .post(API_BASE + `quiz/apiquizNext`, body)
    .then(response => response.data)
    .catch(e => {
      console.log(e.response);
    });
};

export const submitQuiz = body => {
  return axios
    .post(API_BASE + `quiz/quizData`, body)
    .then(response => response.data)
    .catch(e => {
      console.log(e.response);
    });
};

export const submitPractice = body => {
  return axios
    .post(API_BASE + `practice/quizData`, body)
    .then(response => response.data)
    .catch(e => {
      console.log(e.response);
    });
};

export const getQuizStatistics = () => {
  return axios
    .get(API_BASE + `quiz/quizData`)
    .then(response => {
      return response?.data?.data;
    })
    .catch(e => {
      console.log(e);
    });
};

export const getPracticeStatistics = () => {
  return axios
    .get(API_BASE + `practice/quizData`)
    .then(response => {
      return response?.data?.data;
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const deleteUserAccount = async () => {
  return axios
    .delete(API_BASE + 'auth/user/delete')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};

export const saveToken = async body => {
  return axios
    .post(API_BASE + 'auth/user/saveToken', body)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};

export const updateLangApi = async body => {
  return axios
    .post(API_BASE + 'auth/user/updateLang', body)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      // Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};

export const deleteToken = async body => {
  return axios
    .post(API_BASE + 'auth/user/deleteToken', body)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      // // Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};

export const setRemainder = async body => {
  return axios
    .post(API_BASE + 'notifications/saveNotifications', body)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
      Alert.alert(t('overAll.intoProblem'), t('overAll.failedDeleteUser'));
    });
};

export const deleteAllRemainders = async () => {
  return axios
    .delete(API_BASE + 'notifications/deleteNotifications')
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:116 ~ deleteUserAccount ~ e:', e.response);
    });
};

export const getNotifications = async () => {
  return axios
    .get(API_BASE + 'notifications/getNotifications')
    .then(response => {
      return response?.data?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:16 ~ getNotificatons ~ e:', e.response);
    });
};

export const enablePremiumApi = async transactionId => {
  return axios
    .post(API_BASE + 'payment/enablePremium', {transactionId})
    .then(_ => {
      return true;
    })
    .catch(e => {
      return false;
    });
};

export const disablePremiumApi = async () => {
  return axios
    .post(API_BASE + 'payment/disablePremium')
    .then(response => {
      return response?.data?.data;
    })
    .catch(e => {
      console.log('🚀 ~ file: api.js:16 ~ disablePremium ~ e:', e.response);
    });
};
