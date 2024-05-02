// const type = "Google";
// const lcType = type.toLowerCase();
// const provider = socialConfig[lcType];

import React, {useContext, useState, useEffect} from 'react';
import {Text, View, ImageBackground, Alert, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import auth from '@react-native-firebase/auth';
// import AntDesign from "react-native-vector-icons/AntDesign";
import styles from './styles';
import {LoaderContext} from '../../contexts/AppLoading';
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import {useAuth} from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../components/Buttons/Buttons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
// WebBrowser.maybeCompleteAuthSession();

export default function LoginPage({navigation}) {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const {signInWithApple} = useAuth();

  const handleGoogleSignIn = async () => {
    const checkContact = await AsyncStorage.getItem('isFirstContact');
    const checkPoint = Number(checkContact);
    setLoader(true);
    try {
      GoogleSignin.configure({
        webClientId:
          '285876470073-5l5a01vkeu8ru52h066ivsdom2c1s84j.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const userCredential = await auth().signInWithCredential(
        googleCredentials,
      );
      const data = {
        name: userInfo?.user?.name,
        email: userInfo?.user?.email,
        image: userInfo?.user?.photo,
      };
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('token', token);
      const user = JSON.stringify(userCredential);
      await AsyncStorage.setItem('user', user);
      if (checkPoint >= 1) {
        let checking = JSON.stringify(checkPoint + 1);
        setLoader(false);
        await AsyncStorage.setItem('isFirstContact', checking);
        navigation.replace('MainStack');
        return;
      } else {
        navigation.navigate('Contact Details', {
          contactData: data,
        });
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error('Google Sign-In Error: ', error);
    }
  };

  // Apple login.
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (Platform.OS === 'ios') {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credentials have been Revoked',
        );
      });
    }
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/houseBg.png')}
        style={styles.bgWrap}
        resizeMode="contain"></ImageBackground>
      <View style={styles.widthWrap}>
        <View
          onPress={() =>
            Alert.alert(t('overAll.intoProblem'), t('overAll.notLogical'))
          }
          style={{alignSelf: 'flex-end'}}></View>
        <Text style={styles.txtConnect}>{t('overAll.letsConnect')}</Text>
        <View style={styles.wrapBtn}>
          <Buttons
            btnSocial
            innerTxt={t('overAll.googleTxt')}
            imgSource={require('../../assets/images/googleIcon.png')}
            onPress={handleGoogleSignIn}
          />
          {Platform.OS === 'ios' ? (
            <Buttons
              btnSocial
              innerTxt={t('overAll.appleTxt')}
              imgSource={require('../../assets/images/appleIcon.png')}
              onPress={() => signInWithApple(navigation)}
            />
          ) : null}
          <Buttons
            btnSocial
            innerTxt={t('overAll.emailTxt')}
            imgSource={require('../../assets/images/emailIcon.png')}
            onPress={() => {
              navigation.navigate('LoginUser');
            }}
          />
        </View>
      </View>
    </View>
  );
}
