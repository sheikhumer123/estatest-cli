import React, {useContext, useState} from 'react';
// import * as AppleAuthentication from "expo-apple-authentication";
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoaderContext} from '../../contexts/AppLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputs from '../../components/TextInputs/TextInputs';
import Buttons from '../../components/Buttons/Buttons';
import auth from '@react-native-firebase/auth';
import {hp} from '../../dimensions/dimensions';
import otpImage from '../../assets/images/forgotImage.png';
import {Image} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {resetPasswordApi} from '../../api/newApis';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function ResetPasswordScreen({navigation}) {
  const route = useRoute();
  const emailUpcoming = route?.params?.email;
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const passRegex = /^(?=.*[A-Z]).{8,}$/;
  const {lang} = useSelector(state => state.userReducer);

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert(t('overAll.intoProblem'), t('overAll.passnotMatch'));
      return;
    }
    const checkPassword = passRegex.test(password);
    if (!checkPassword) {
      setShowError(true);
      return;
    }
    setLoader(true);
    const body = {
      email: emailUpcoming,
      password: password,
    };
    await resetPasswordApi(body)
      .then(result => {
        setLoader(false);
        navigation.navigate('LoginUser');
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignSelf: 'flex-end', marginTop: hp(2)}}>
            <AntDesign name="arrowright" size={26} color={'black'} />
          </TouchableOpacity>
          <View style={styles.imgContainer}>
            <View style={styles.otpImage}>
              <Image
                source={otpImage}
                style={styles.img}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.txtConnect}>{t('overAll.resetPass')}</Text>
          <Text style={styles.txtConnect2}>{t('overAll.resetPassDesc')}</Text>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TextInputs
              secureTextEntry
              value={password}
              simpleTxtInput
              placeholder={t('overAll.password')}
              onChangeText={text => setPassword(text)}
            />
            <TextInputs
              secureTextEntry
              value={confirmPassword}
              simpleTxtInput
              placeholder={t('overAll.confirmPass')}
              onChangeText={text => setConfirmPassword(text)}
            />
            {showError && (
              <Text
                style={{
                  textAlign: lang == 'en' ? 'left' : 'right',
                  color: 'red',
                  marginTop: 5,
                }}>
                {t('overAll.2ndPassError')}
              </Text>
            )}

            <Buttons
              disabled={password.length > 0 ? false : true}
              mediumBtn
              innerTxt={t('overAll.ChangePass')}
              marginTop={'7%'}
              onPress={updatePassword}
            />
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
