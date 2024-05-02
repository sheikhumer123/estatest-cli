import React, {useContext, useState, useEffect} from 'react';
// import * as AppleAuthentication from "expo-apple-authentication";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {LoaderContext} from '../../contexts/AppLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputs from '../../components/TextInputs/TextInputs';
import Buttons from '../../components/Buttons/Buttons';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useAuth} from '../../contexts/AuthContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {wp, hp, RFS} from '../../dimensions/dimensions';
import {useSelector} from 'react-redux';

export default function LoginUser({navigation}) {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const {lang} = useSelector(state => state.userReducer);
  // Authentication: User creation.
  //kalidinali@yopmail.com
  //Umerjaved321@
  const [email, setEmail] = useState(''); // email for testing purposes
  const [password, setPassword] = useState(''); // password for testing purposes
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  // const [signtoken,setToken]= useState('')

  // login with Google account
  const {signInWithApple, signInWithGoogle} = useAuth();

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

  const loginFunction = async () => {
    let userCredential;
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
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async result => {
          userCredential = result;
          return userCredential.user.getIdToken(true);
        })
        .then(async result => {
          await AsyncStorage.setItem('token', result);
          const user = JSON.stringify(userCredential);
          console.log({user: JSON.parse(user)});
          await AsyncStorage.setItem('user', user);
          const completeUser = JSON.parse(user);
          setUser(user);
          if (checkPoint >= 1) {
            let checking = JSON.stringify(checkPoint + 1);
            await AsyncStorage.setItem('isFirstContact', checking);
            const Verified = auth().currentUser.emailVerified;
            if (Verified && user) {
              await AsyncStorage.setItem('user', user);
              setLoader(false);
              navigation.replace('MainStack');
              return;
            } else {
              Alert.alert(t('overAll.alert'), t('overAll.beforeProcedure'), [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
              setLoader(false);
            }
            return;
          } else {
            const data = {
              name: null,
              email: completeUser.user.email,
              image: null,
              phone: null,
              uid: completeUser?.user?.uid,
            };
            navigation.navigate('Contact Details', {contactData: data});
            setLoader(false);
          }
        })
        .catch(error => {
          console.log(
            '🚀 ~ file: index.jsx:59 ~ loginFunction ~ error:',
            error,
          );
          // Handle errors
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
      console.log('error', error);
      alert(error);
    }
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
            onPress={() => navigation.goBack()}
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
              marginTop: hp(3),
            }}>
            {rememberMe ? (
              <TouchableOpacity onPress={() => setRemmberMe(!rememberMe)}>
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
            )}

            <Text style={styles.txtRememberMe}>{t('overAll.rememberMe')}</Text>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible(true);
              setTimeout(() => {
                setModalVisible(false);
              }, 3000);
            }}
            style={styles.wrapImgSocial}
          >
            <Image
              style={styles.innerImg}
              resizeMode="contain"
              source={require("../../assets/images/faceid.png")}
            />
          </TouchableOpacity> */}
          <Buttons
            mediumBtn
            innerTxt={t('overAll.connect')}
            marginTop={'7%'}
            onPress={loginFunction}
          />
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
