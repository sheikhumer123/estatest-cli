import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateUserDetails, getUserDetails} from '../../api/api';
import ImageCropPicker from 'react-native-image-crop-picker';
import {LoaderContext} from '../../contexts/AppLoading';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {privacyPolicy, termsOfUse} from '../../utils/defaultURLs';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../Permission';
import {RFS, hp, wp} from '../../dimensions/dimensions';
import {useSelector} from 'react-redux';

const ContactForm = ({navigation, route}) => {
  const {lang} = useSelector(state => state.userReducer);
  console.log(lang);
  const {contactData} = route.params;
  console.log({contactData: contactData});
  const dispatch = useDispatch();
  const {setLoader} = useContext(LoaderContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [picture, setPicture] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const {t} = useTranslation();
  // const uid = auth().currentUser.uid;
  // console.log("🚀 ~ file: index.jsx:36 ~ ContactForm ~ uid:", uid)
  // const reference = storage().ref('userProfiles').child(uid);
  useEffect(() => {
    const fun = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log({'token-------': token});
      // const completeUser = JSON.parse(user);
      // setNewUser(completeUser);
      setEmail(contactData.email);
      setName(contactData.name);
      setPhoneNumber(contactData.phone);
      setPicture(contactData.image);
    };
    fun();
  }, []);

  const validateEmail = email => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    if (name === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingFullName'));
      return;
    } else if (email === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingEmail'));
      return;
    } else if (city === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingCity'));
      return;
    } else if (picture === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingPhoto'));
      return;
    }
    console.log('Entered');
    try {
      const isValid = validatePhone(phoneNumber) && validateEmail(email);
      if (contactData) {
        setLoader(true);
        const body = {
          uid: contactData.uid,
          name: name,
          email: email,
          phone: phoneNumber,
          city: city,
          picture: picture,
        };

        console.log('🚀 ~ file: index.jsx:78 ~ handleSubmit ~ body:', body);
        const response = await updateUserDetails(body);
        console.log(
          '🚀 ~ file: index.jsx:79 ~ handleSubmit ~ response:',
          response,
        );
        setLoader(false);
        if (contactData) {
          await AsyncStorage.setItem('details', 'true');
          await AsyncStorage.setItem('isFirstContact', '1');
          const Verified = auth().currentUser.emailVerified;
          if (!Verified) {
            Alert.alert(t('overAll.alert'), t('overAll.beforeProcedure'), [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            navigation.navigate('Login');
            // resetNavigationStack();
          } else {
            resetNavigationStack();
          }
        }
      } else {
        setLoader(false);
        Alert.alert(t('overAll.intoProblem'), t('overAll.pleaseProvide'));
      }
    } catch (error) {
      alert(error);
    }
  };

  const resetNavigationStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainStack'}],
      }),
    );
  };
  // Image picker.
  const handleImagePicker = async () => {
    if (
      // (await requestCameraPermission()) &&
      await requestExternalWritePermission()
    ) {
      ImageCropPicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: 'photo',
      })
        .then(async image => {
          // setLoader(true);
          setPicture(image?.path);
          // await reference.putFile(image?.path);
          // const url = await reference.getDownloadURL();
          // setPicture(url);
          // setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          console.log(
            '🚀 ~ file: index.jsx:107 ~ handleImagePicker ~ error:',
            error,
          );
        });
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/houseBg.png')}
          resizeMode="cover"
          style={styles.bgWrap}>
          <Text style={styles.moreDetailsTitle}>{t('overAll.join')}</Text>
          <Text style={styles.moreDetailsSubtitle}>
            {t('overAll.lastDetails')}
          </Text>
          <TouchableOpacity
            style={styles.imageContainer}
            activeOpacity={0.7}
            onPress={handleImagePicker}>
            <Image
              source={
                picture
                  ? {uri: picture}
                  : require('../../assets/images/userimag2.jpg')
              }
              style={styles.userImage}
              resizeMode="contain"
            />
            {/* onPress={handleImagePicker} 👇👇👇 */}
            <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
              <Image
                source={require('../../assets/images/refresh.png')}
                style={styles.refreshImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Full name */}
          <View style={styles.emailContainer}>
            <Text
              style={{
                color: '#939393',
                fontSize: RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.fullName')}
            </Text>
            <TextInput
              style={{
                height: 30,
                fontSize: RFS(14),
                textAlign: lang == 'en' ? 'left' : 'right',
                color: 'black',
                padding: Platform.OS == 'android' ? 5 : 0,
                marginHorizontal: 5,
              }}
              placeholder={lang == 'en' ? 'Name' : 'שֵׁם'}
              placeholderTextColor="#bbb"
              value={name}
              onChangeText={setName}
            />
          </View>
          {/* Email Container */}
          <View style={styles.emailContainer}>
            <Text
              style={{
                color: '#939393',
                fontSize: RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.emailUser')}
            </Text>
            <TextInput
              style={{
                height: 30,
                fontSize: RFS(14),
                padding: Platform.OS == 'android' ? 5 : 0,
                textAlign: lang == 'en' ? 'left' : 'right',
                color: 'black',
                marginHorizontal: 5,
              }}
              placeholder={lang == 'en' ? 'Email' : 'אימייל'}
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          {/* Number Container */}
          <View style={styles.emailContainer}>
            <Text
              style={{
                color: '#939393',
                fontSize: RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.phone')}
            </Text>
            <TextInput
              style={{
                height: 30,
                fontSize: RFS(14),
                padding: Platform.OS == 'android' ? 5 : 0,
                textAlign: lang == 'en' ? 'left' : 'right',
                color: 'black',
                marginHorizontal: 5,
              }}
              placeholder={lang == 'en' ? 'Phone Number' : 'מספר טלפון'}
              placeholderTextColor="#bbb"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          {/* City Container */}
          <View style={styles.emailContainer}>
            <Text
              style={{
                color: '#939393',
                fontSize: RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.city')}
            </Text>
            <TextInput
              style={{
                height: 30,
                fontSize: RFS(14),
                padding: Platform.OS == 'android' ? 5 : 0,
                textAlign: lang == 'en' ? 'left' : 'right',
                color: 'black',
                marginHorizontal: 5,
              }}
              placeholder={lang == 'en' ? 'City' : 'עִיר'}
              placeholderTextColor="#bbb"
              value={city}
              onChangeText={setCity}
              keyboardType="default"
            />
          </View>
          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <View style={styles.termsConditionContainer}>
              <TouchableOpacity
                onPress={() => {
                  handlePrivacy(privacyPolicy);
                }}>
                <Text style={styles.termsConditions}>
                  {t('overAll.privacy')}
                </Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  handleTerms(termsOfUse);
                }}>
                <Text style={styles.termsConditions}>{t('overAll.terms')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.deleteText}>{t('overAll.finished')}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContactForm;
