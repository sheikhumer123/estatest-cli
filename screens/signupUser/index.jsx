import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useContext, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Buttons from '../../components/Buttons/Buttons';
import TextInputs from '../../components/TextInputs/TextInputs';
import {LoaderContext} from '../../contexts/AppLoading';
import {useAuth} from '../../contexts/AuthContext';
import {hp} from '../../dimensions/dimensions';
import styles from './styles';

import {otherLogin, signUpUser} from '../../api/newApis';
import {getUserDetails} from '../../api/newApisToken';
import SignUpTerms from '../../components/signupterms/SignUpTerms';

export default function SignUp({navigation}) {
  const {t} = useTranslation();
  const passRegex = /^(?=.*[A-Z]).{8,}$/;
  const emailregex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const {lang} = useSelector(state => state.userReducer);
  const {signInWithApple} = useAuth();
  const {setLoader} = useContext(LoaderContext);
  const phoneInput = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passerro, setPasserror] = useState('enterPassword');
  const [emailError, setEmailError] = useState('enterEmail');

  const validateEmail = email => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const [errorlist, setErrorlist] = useState({
    fullName: false,
    email: false,
    cellPhone: false,
    password: false,
    confirmPassword: false,
  });

  const removeError = name => {
    const values = {
      fullName: fullName,
      email: email,
      cellPhone: cellPhone,
      password: password,
      confirmPassword: confirmPassword,
    };

    if (values[name].length > 0) {
      setErrorlist({
        ...errorlist,
        [name]: false,
      });
    }
    if (name == 'email' && values.email.length > 0) {
      const check = emailregex.test(values.email);
      setEmailError('email2ndErorr');
      setErrorlist({
        ...errorlist,
        [name]: !check,
      });
    }
    if (name == 'password' && values.password.length > 0) {
      const check = passRegex.test(values.password);
      setPasserror('2ndPassError');
      setErrorlist({
        ...errorlist,
        [name]: !check,
      });
    }
    if (name == 'confirmPassword') {
      const check = password == confirmPassword ? false : true;
      setErrorlist({
        ...errorlist,
        [name]: check,
      });
    }
  };

  const showEmailAlert = () => {
    Alert.alert(t('overAll.intoProblem'), t('overAll.emailexist'));
  };

  const signUpFunction = async () => {
    const newErrors = {};
    const values = {
      fullName: fullName,
      email: email,
      cellPhone: cellPhone,
      password: password,
      confirmPassword: confirmPassword,
    };

    Object.entries(values).forEach(([key, value]) => {
      newErrors[key] = value.length === 0;
      if (key == 'confirmPassword') {
        const check = password == confirmPassword ? false : true;
        newErrors[key] = check;
      }
      if (key == 'password' && password.length > 0) {
        const check = passRegex.test(password);
        setPasserror('2ndPassError');
        newErrors[key] = !check;
      }
    });
    setErrorlist(newErrors);
    const formIsValid = Object.values(newErrors).every(e => !e);
    if (formIsValid) {
      try {
        const data = {
          name: fullName,
          email: email.toLowerCase(),
          password: password,
          phone: cellPhone,
        };
        if (1 == 1) {
          setLoader(true);
          const response = await signUpUser(data, setLoader, showEmailAlert);
          await AsyncStorage.setItem('token', response?.token);
          if (response) {
            const data = {
              name: response?.name,
              email: response?.email,
              password: password,
              phone: response?.phone,
              verified: response?.verified,
              uid: response?.uid,
            };
            setLoader(false);
            navigation.navigate('Contact Details', {contactData: data});
          }
        }
      } catch (error) {
        setLoader(false);
        console.log(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '285876470073-5l5a01vkeu8ru52h066ivsdom2c1s84j.apps.googleusercontent.com',
      });

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const data = {
        name: userInfo?.user?.name,
        email: userInfo?.user?.email,
        picture: userInfo?.user?.photo,
      };

      const user = JSON.stringify(data);
      const response = await otherLogin(data, setLoader);
      if (response) {
        await AsyncStorage.setItem('token', response?.token);
      }
      const userInfo2 = await getUserDetails();
      if (userInfo2?.name && userInfo2?.city && userInfo2?.phone) {
        await AsyncStorage.setItem('user', user);
        navigation.replace('MainStack');
        return;
      } else {
        const data2 = {
          name: userInfo?.user?.name,
          email: userInfo?.user?.email,
          image: userInfo?.user?.photo,
          verified: userInfo2?.verified,
          uid: userInfo2?.uid,
          check: true,
        };
        navigation.navigate('Contact Details', {
          contactData: data2,
        });
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return null;
      }
      // Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{alignSelf: 'flex-end', marginTop: hp(4)}}>
              <AntDesign name="arrowright" size={26} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.txtConnect}>{t('overAll.enrollment')}</Text>
            <TextInputs
              required
              value={fullName}
              simpleTxtInput
              placeholder={t('overAll.fullName')}
              onChangeText={text => setFullName(text)}
              error={t('overAll.enterFullName')}
              showError={errorlist.fullName}
              onBlurFunction={() => removeError('fullName')}
            />
            <TextInputs
              required
              value={email}
              simpleTxtInput
              placeholder={t('overAll.email')}
              onChangeText={text => setEmail(text)}
              keyboardType={'email-address'}
              error={t(`overAll.${emailError}`)}
              showError={errorlist.email}
              onBlurFunction={() => removeError('email')}
            />
            <TextInputs
              required
              value={cellPhone}
              simpleTxtInput
              placeholder={t('overAll.cellPhone')}
              onChangeText={text => setCellPhone(text)}
              keyboardType={'phone-pad'}
              error={t('overAll.enterCellPhone')}
              showError={errorlist.cellPhone}
              onBlurFunction={() => removeError('cellPhone')}
            />

            <TextInputs
              required
              value={password}
              simpleTxtInput
              placeholder={t('overAll.password')}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              error={t(`overAll.${passerro}`)}
              showError={errorlist.password}
              onBlurFunction={() => removeError('password')}
            />

            <TextInputs
              required
              value={confirmPassword}
              simpleTxtInput
              secureTextEntry
              placeholder={t('overAll.confirmPassword')}
              onChangeText={text => setConfirmPassword(text)}
              error={t('overAll.noMatchPassword')}
              showError={errorlist.confirmPassword}
              onBlurFunction={() => removeError('confirmPassword')}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              marginRight: 15,
              marginLeft: 10,
            }}>
            <SignUpTerms signup />
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Buttons
              mediumBtn
              innerTxt={t('overAll.createUser')}
              marginTop={'5%'}
              onPress={() => signUpFunction()}
            />

            <Text style={styles.txtLogUsing}>{t('overAll.logUsing')}</Text>
            <View style={styles.flexRow}>
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.wrapImgSocial}
                  onPress={() => signInWithApple(navigation)}>
                  <Image
                    style={styles.innerImg}
                    resizeMode="contain"
                    source={require('../../assets/images/appleIcon.png')}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.wrapImgSocial}
                onPress={handleGoogleSignIn}>
                {!loading && (
                  <Image
                    style={styles.innerImg}
                    resizeMode="contain"
                    source={require('../../assets/images/googleIcon.png')}
                  />
                )}
                <ActivityIndicator size={30} animating={loading} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
