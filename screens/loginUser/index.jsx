import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Buttons from '../../components/Buttons/Buttons';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import TextInputs from '../../components/TextInputs/TextInputs';
import {LoaderContext} from '../../contexts/AppLoading';
import {useAuth} from '../../contexts/AuthContext';
import {RFS, hp} from '../../dimensions/dimensions';
import styles from './styles';
const whtsapp = require('../../assets/images/whatsapp.png');

import {loginUser, otherLogin} from '../../api/newApis';
import {getUserDetails} from '../../api/newApisToken';
import {openWhatsapp} from '../../utils/DefaultMethods';

export default function LoginUser({navigation}) {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const {lang} = useSelector(state => state.userReducer);
  const [email, setEmail] = useState(''); // email for testing purposes
  const [password, setPassword] = useState(''); // password for testing purposes
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();

  const {signInWithApple, signInWithGoogle} = useAuth();

  const showErrorAlert = () => {
    Alert.alert(t('overAll.intoProblem'), t('overAll.wrongcreds'));
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

  const loginFunction = async () => {
    if (email === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterEmailAddress'));
      return;
    } else if (password === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterPassword'));
      return;
    }

    setLoader(true);
    try {
      const checkContact = await AsyncStorage.getItem('isFirstContact');
      const checkPoint = Number(checkContact);
      const body = {
        email: email,
        password: password,
      };
      const response = await loginUser(body, setLoader, showErrorAlert);
      if (!response) {
        setLoader(false);
        return;
      }
      await AsyncStorage.setItem('token', response?.token);
      const userInfo2 = await getUserDetails();
      const user = JSON.stringify(userInfo2);
      setLoader(false);
      if (userInfo2?.name && userInfo2?.city && userInfo2?.phone) {
        let checking = JSON.stringify(checkPoint + 1);
        await AsyncStorage.setItem('isFirstContact', checking);
        await AsyncStorage.setItem('login', 'true');
        const Verified = userInfo2?.verified;
        if (Verified && user) {
          console.log('is this running');
          await AsyncStorage.setItem('user', user);
          setLoader(false);
          navigation.replace('MainStack');
          return;
        } else {
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
        }
        return;
      } else {
        const data = {
          name: userInfo2?.name || null,
          email: userInfo2.email || null,
          image: userInfo2?.picture || null,
          phone: userInfo2.phone || null,
          city: userInfo2?.city || null,
          uid: userInfo2?.uid,
          verified: userInfo2?.verified,
        };
        navigation.navigate('Contact Details', {contactData: data});
        setLoader(false);
      }
    } catch {}
  };

  return (
    <View style={styles.container}>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{alignSelf: 'flex-end'}}>
            <AntDesign name="arrowright" size={26} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.txtConnect}>{t('overAll.connection')}</Text>
          <TextInputs
            value={email}
            simpleTxtInput
            placeholder={t('overAll.email')}
            onChangeText={text => setEmail(text)}
          />
          <TextInputs
            value={password}
            simpleTxtInput
            placeholder={t('overAll.password')}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <View
            style={{
              flexDirection: lang == 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
              alignSelf: 'center',
              // marginTop: hp(3),
            }}>
            {/* {rememberMe ? (
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  color={'#327DE5'}
                  size={24}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  color={'#327DE5'}
                  size={24}
                />
              </TouchableOpacity>
            )} */}

            {/* <Text style={styles.txtRememberMe}>{t('overAll.rememberMe')}</Text> */}
          </View>

          <Buttons
            mediumBtn
            innerTxt={t('overAll.connect')}
            marginTop={'7%'}
            onPress={loginFunction}
          />
          <View
            style={{
              marginVertical: hp(2),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: lang == 'he' ? 'row-reverse' : 'row',
              gap: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Assistant-Regular',
                fontSize: RFS(13),
                color: 'black',
              }}>
              {t('overAll.encouter')}
            </Text>
            <View
              style={{
                flexDirection: lang == 'he' ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: 2,
              }}>
              <Image
                source={whtsapp}
                resizeMode="contain"
                style={{height: hp(2), width: hp(2)}}
              />
              <TouchableOpacity onPress={openWhatsapp}>
                <Text
                  style={{
                    fontFamily: 'Assistant-SemiBold',
                    fontSize: RFS(13),
                    color: 'black',
                  }}>
                  {t('overAll.talktoUs')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.txtForget}>{t('overAll.forgotPassword')}</Text>
          </TouchableOpacity>
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
              <Image
                style={styles.innerImg}
                resizeMode="contain"
                source={require('../../assets/images/googleIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: '5%'}}
            onPress={() => navigation.navigate('SignUp')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.txtDontHave, fontWeight: '700'}}>
                {t('overAll.createNow')}
              </Text>
              <Text style={styles.txtDontHave2}>
                {t('overAll.dontHaveUser')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
