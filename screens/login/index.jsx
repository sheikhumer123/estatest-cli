import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {LoaderContext} from '../../contexts/AppLoading';

import {useAuth} from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../components/Buttons/Buttons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {hp, wp} from '../../dimensions/dimensions';
import {otherLogin, signUpUser} from '../../api/newApis';
import {getUserDetails} from '../../api/newApisToken';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import VersionCheck from 'react-native-version-check';
import {useIsFocused} from '@react-navigation/native';

export default function LoginPage({navigation}) {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const {signInWithApple} = useAuth();
  const [loading, setLoading] = useState(false);
  const {lang} = useSelector(state => state.userReducer);
  const focused = useIsFocused();

  useEffect(() => {
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        Alert.alert(
          t('overAll.updateTitle'),
          t('overAll.alertToupdate'),
          [
            {
              text: t('overAll.udpatebtn'),
              onPress: () => Linking.openURL(res.storeUrl),
            },
          ],
          {cancelable: false},
        );
        Linking.openURL(res.storeUrl);
        return;
      }
    });
  }, [focused]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
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
        if (!userInfo2?.verified) {
          const data = {
            uid: userInfo2?.uid,
            name: userInfo2?.email,
            user: user,
          };
          Alert.alert(
            `${t('overAll.notifyTitle')}`,
            `${t('overAll.confirmNotify')}`,
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('OTPScreen', {data: data}),
              },
            ],
          );
          setLoader(false);
          return;
        }
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
        setLoading(false);
      }
    } catch (error) {
      setLoader(false);
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Unknown error during sign in', error);
      }
    }
  };

  // Apple login.
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (Platform.OS === 'ios') {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credential have been Revoked',
        );
      });
    }
  }, []);

  return (
    <>
      {loading && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            zIndex: 99,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#3283e6'} />
            <Text
              style={{
                fontSize: 16,
                color: '#3283e6',
                fontWeight: '500',
                marginTop: hp(1),
              }}>
              {lang == 'en' ? 'Loading...' : 'טוען...'}
            </Text>
          </View>
        </View>
      )}

      <>
        <Animated.View entering={FadeIn} View style={styles.container}>
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
                onPress={() => {
                  setTimeout(() => {
                    handleGoogleSignIn();
                  }, 200);
                }}
              />
              <Buttons
                btnSocial
                innerTxt={t('overAll.emailTxt')}
                imgSource={require('../../assets/images/emailIcon.png')}
                onPress={() => {
                  navigation.navigate('LoginUser');
                }}
              />
              {Platform.OS === 'ios' ? (
                <Buttons
                  appleButton
                  innerTxt={t('overAll.appleTxt')}
                  imgSource={require('../../assets/images/whiteApple.png')}
                  onPress={() =>
                    signInWithApple(
                      navigation,
                      t('overAll.notifyTitle'),
                      t('overAll.confirmNotify'),
                    )
                  }
                />
              ) : null}
              <TouchableOpacity
                style={{alignSelf: 'center', marginTop: '5%'}}
                onPress={() => navigation.navigate('SignUp')}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...styles.txtDontHave,
                      fontWeight: '700',
                      color: '#2FA5EB',
                    }}>
                    {t('overAll.createNow')}
                  </Text>
                  <Text style={styles.txtDontHave2}>
                    {t('overAll.dontHaveUser')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </>
    </>
  );
}
