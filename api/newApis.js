import axios from 'axios';
import {t} from 'i18next';
import {Alert} from 'react-native';

const API_BASE = 'https://estatest-backend-theta.vercel.app/v1/';

export const updateUserDetails = async (data, loader) => {
  return axios
    .put(API_BASE + `auth/user/updateUser`, data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      loader(false);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const getUrlsLinksTerms = async (data, loader) => {
  return axios
    .get(API_BASE + `auth/getTermsLinks`, data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      loader(false);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const getExamLinks = async (data, loader) => {
  return axios
    .get(API_BASE + `auth/getexamlinks`, data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      loader(false);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const signUpUser = async (data, loader, showEmailAlert) => {
  return axios
    .post(API_BASE + 'auth/signup', data)
    .then(response => {
      console.log(response);
      return response?.data;
    })
    .catch(e => {
      loader(false);
      setTimeout(() => {
        if (e.response.data.message == 'Email already exists') {
          showEmailAlert();
          return;
        }
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const otherLogin = async (data, loader) => {
  return axios
    .post(API_BASE + 'auth/otherLogin', data)
    .then(response => {
      return response?.data;
    })
    .catch(e => {
      console.log(e);
      loader(false);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const loginUser = async (data, loader, showError) => {
  return axios
    .post(API_BASE + 'auth/login', data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      loader(false);
      if (e.response.data.message == 'Invalid credentials') {
        showError && showError();
        return;
      }
      console.log(e.response.data.message);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), e.response.data.message);
      }, 200);
    });
};

export const sendOTP = async data => {
  return axios
    .post(API_BASE + 'auth/user/sendOTP', data)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      setTimeout(() => {
        Alert.alert(t('overAll.intoProblem'), t('overAll.failedtosendOtp'));
      }, 200);
    });
};

export const verifyOTP = async data => {
  return axios.post(API_BASE + 'auth/user/verifyOTP', data);
};
export const verifyOTPReset = async data => {
  return axios.post(API_BASE + 'auth/user/verifyOTPpassowrd', data);
};

export const resetPasswordApi = async data => {
  return axios.post(API_BASE + 'auth/user/resetPassword', data);
};
