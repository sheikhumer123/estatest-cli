import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoaderContext} from '../../contexts/AppLoading';
import {useAuth} from '../../contexts/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputs from '../../components/TextInputs/TextInputs';
import Buttons from '../../components/Buttons/Buttons';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {wp, hp, RFS} from '../../dimensions/dimensions';
import {useSelector} from 'react-redux';
import {handleTerms} from '../../utils/DefaultMethods';
import {termsOfUse} from '../../utils/defaultURLs';

export default function SignUp({navigation}) {
  const {t} = useTranslation();
  const {signInWithApple} = useAuth();
  const {setLoader} = useContext(LoaderContext);
  // Authentication: User creation.
  const [isActive, setIsActive] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const signUpFunction = async () => {
    if (fullName === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterFullName'));
      return;
    } else if (email === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterEmail'));
      return;
    } else if (cellPhone === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterCellPhone'));
      return;
    } else if (password === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterPassword'));
      return;
    } else if (confirmPassword === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.enterConfirmPassword'));
      return;
    } else if (confirmPassword !== password) {
      Alert.alert(t('overAll.intoProblem'), t('overAll.noMatchPassword'));
      return;
    } else if (isActive === false) {
      Alert.alert(t('overAll.intoProblem'), t('overAll.approvalOfTermsOfUse'));
      return;
    } else setLoader(true);
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredential => {
          userCredential.user.getIdToken().then(async token => {
            await AsyncStorage.setItem('token', token);
          });
          await auth().currentUser.sendEmailVerification();
          const user = JSON.stringify(userCredential);
          const completeUser = JSON.parse(user);
          // await AsyncStorage.setItem('user', user);
          setFullName('');
          setEmail('');
          setCellPhone('');
          setPassword('');
          setConfirmPassword('');
          setLoader(false);
          const data = {
            name: fullName,
            email: email,
            image: image,
            phone: cellPhone,
            uid: completeUser?.user?.uid,
          };
          navigation.navigate('Contact Details', {contactData: data});
        })
        .catch(error => {
          setLoader(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert(t('overAll.intoProblem'), t('overAll.theEmail'));
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert(t('overAll.intoProblem'), t('overAll.emailInvalid'));
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert(t('overAll.intoProblem'), t('overAll.pass6Char'));
          }
          console.error(error);
        });
    } catch (error) {
      setLoader(false);
      console.log(error);
      // alert(error);
    }
  };
  // Google login
  const handleGoogleSignIn = async () => {
    setLoader(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info: ', userInfo);
      const user = JSON.stringify(userInfo);
      const token = userInfo?.idToken;
      await AsyncStorage.setItem('user', user);
      await AsyncStorage.setItem('token', token);
      setLoader(false);
      navigation.navigate('Contact Details', {
        data: {
          name: userInfo?.user?.name,
          email: userInfo?.user?.email,
          image: userInfo?.user?.photo,
        },
      });
    } catch (error) {
      setLoader(false);
      console.error('Google Sign-In Error: ', error);
    }
  };
  const {lang} = useSelector(state => state.userReducer);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignSelf: 'flex-end', marginTop: hp(4)}}>
            <AntDesign name="arrowright" size={26} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.txtConnect}>{t('overAll.enrollment')}</Text>
          <TextInputs
            value={fullName}
            simpleTxtInput
            placeholder={t('overAll.fullName')}
            onChangeText={text => setFullName(text)}
          />
          <TextInputs
            value={email}
            simpleTxtInput
            placeholder={t('overAll.email')}
            onChangeText={text => setEmail(text)}
            keyboardType={'email-address'}
          />
          <TextInputs
            value={cellPhone}
            simpleTxtInput
            placeholder={t('overAll.cellPhone')}
            onChangeText={text => setCellPhone(text)}
            keyboardType={'phone-pad'}
          />

          <TextInputs
            value={password}
            simpleTxtInput
            placeholder={t('overAll.password')}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />

          <TextInputs
            value={confirmPassword}
            simpleTxtInput
            secureTextEntry
            placeholder={t('overAll.confirmPassword')}
            onChangeText={text => setConfirmPassword(text)}
          />
          <View
            style={{
              marginLeft: wp(3),
              flexDirection: lang == 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsActive(!isActive);
              }}>
              {isActive ? (
                <AntDesign name="checkcircleo" size={20} color={'#000000'} />
              ) : (
                <Entypo name="circle" size={20} color={'#E5E9EF'} />
              )}
            </TouchableOpacity>
            <Text
              style={[
                styles.checkText,
                {color: isActive ? '#000000' : '#9299A3'},
              ]}>
              {t('overAll.termsOfUse')}
              <Text
                onPress={() => handleTerms(termsOfUse)}
                style={{
                  color: 'black',
                  fontSize: RFS(12),
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                {t('overAll.termsOfUse2')}
              </Text>
            </Text>
          </View>
          <Buttons
            mediumBtn
            innerTxt={t('overAll.createUser')}
            marginTop={'5%'}
            onPress={() => signUpFunction()}
          />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.txtForget}>{t("overAll.forgotPassword")}</Text>
          </TouchableOpacity> */}
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
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
