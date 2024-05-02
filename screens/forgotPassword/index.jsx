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
import {RFS, hp} from '../../dimensions/dimensions';
import otpImage from '../../assets/images/forgotImage.png';
import {Image} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

export default function ForgotPassword({navigation}) {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const emailregex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const [email, setEmail] = useState('');
  const {lang} = useSelector(state => state.userReducer);
  const [showError, setShowError] = useState('');

  const forgotFunction = () => {
    const check = emailregex.test(email);
    if (check) {
      setShowError(false);
      const data = {
        name: email,
        check: true,
      };
      navigation.navigate('OTPScreen', {data: data});
      return;
    }
    setShowError(true);
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
          <Text style={styles.txtConnect}>{t('overAll.forgotPassword')}</Text>
          <Text style={styles.txtConnect2}>{t('overAll.forgotDesc')}</Text>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TextInputs
              value={email}
              simpleTxtInput
              placeholder={t('overAll.forgotEmail')}
              onChangeText={text => setEmail(text)}
            />
            {showError && (
              <Text
                style={{
                  color: 'red',
                  fontSize: RFS(13),
                  textAlign: lang == 'he' ? 'right' : 'left',
                  fontFamily: 'Assistant',
                  marginTop: 5,
                  marginHorizontal: 5,
                }}>
                {t('overAll.incorrectEmail')}
              </Text>
            )}

            <Buttons
              disabled={email.length > 0 ? false : true}
              mediumBtn
              innerTxt={t('overAll.sendReset')}
              marginTop={'7%'}
              onPress={forgotFunction}
            />
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
