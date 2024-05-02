import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {LoaderContext} from '../../contexts/AppLoading';
import {wp, RFS, hp, iosPAD, isPAD} from '../../dimensions/dimensions';
import {
  handleEULA,
  handlePrivacy,
  handleTerms,
} from '../../utils/DefaultMethods';
import {EULA, privacyPolicy, termsOfUse} from '../../utils/defaultURLs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {toggleMarkettingApi, updateUserDetails} from '../../api/newApisToken';
import PhoneInput from 'react-native-phone-number-input';
import {uploadMultipleImages} from '../../utils/firebaseFunctions';

const ContactForm = ({navigation, route}) => {
  const {lang, termsLinks} = useSelector(state => state.userReducer);
  const {contactData} = route.params;
  const {setLoader} = useContext(LoaderContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [picture, setPicture] = useState('');
  const {t} = useTranslation();
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(false);

  useEffect(() => {
    const fun = async () => {
      setEmail(contactData?.email);
      setName(contactData?.name);
      setPhoneNumber(contactData?.phone);
      setPicture(contactData?.image);
      setCity(contactData?.city);
      setImage(contactData?.image);
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

  const type = typeof image == 'object' ? true : false;

  console.log(type);

  const handleSubmit = async () => {
    if (name === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingFullName'));
      return;
    } else if (email === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingEmail'));
      return;
    } else if (phoneNumber === undefined) {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingPhone'));
      return;
    } else if (city === '') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.missingCity'));
      return;
    }
    try {
      setLoader(true);
      const uploadedImage = await uploadMultipleImages([image]);
      const isValid = validateEmail(email);
      if (contactData && isValid) {
        const body = {
          name: name,
          phone: phoneNumber || '',
          city: city,
          picture: uploadedImage || picture ? picture : '',
        };
        const response = await updateUserDetails(body, setLoader);
        setLoader(false);
        if (response) {
          await AsyncStorage.setItem('details', 'true');
          await AsyncStorage.setItem('isFirstContact', '1');
          const Verified = contactData?.verified;
          if (!Verified) {
            const data = {
              uid: contactData?.uid,
              name: contactData?.email,
              user: contactData,
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
          } else {
            await AsyncStorage.setItem('user', JSON.stringify(body));
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
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    })
      .then(async image => {
        setPicture(image?.path);
        setImage(image);
      })
      .catch(error => {
        if (error.message == 'User did not grant library permission.') {
          Alert.alert('Permission Required ', 'Give Access to Photos', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => Linking.openURL('app-settings:')},
          ]);
        } else {
          null;
        }
      });
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
                ...(iosPAD && {marginTop: hp(1)}),
                color: '#939393',
                fontSize: iosPAD ? RFS(11) : RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.fullName')}
            </Text>

            <TextInput
              style={{
                height: isPAD ? hp(6) : 30,
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
                ...(iosPAD && {marginTop: hp(1)}),
                color: '#939393',
                fontSize: iosPAD ? RFS(11) : RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.emailUser')}
            </Text>
            <TextInput
              editable={false}
              style={{
                height: isPAD ? hp(6) : 30,
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
          {/* <View style={styles.emailContainer}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={contactData.phone}
              defaultCode={contactData.countryCode}
              layout="second"
              containerStyle={{flex: 1, width: '100%'}}
              flagButtonStyle={{backgroundColor: '#F8FAFC', borderRadius: 5}}
              onChangeText={text => {
                // setNumber(text);
              }}
              textContainerStyle={{
                backgroundColor: '#F8FAFC',
              }}
            />
          </View> */}

          <View style={styles.emailContainer}>
            <Text
              style={{
                ...(iosPAD && {marginTop: hp(1)}),
                color: '#939393',
                fontSize: iosPAD ? RFS(11) : RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.phone')}
            </Text>
            <TextInput
              style={{
                height: isPAD ? hp(6) : 30,
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
                ...(iosPAD && {marginTop: hp(1)}),
                color: '#939393',
                fontSize: iosPAD ? RFS(11) : RFS(9),
                fontFamily: 'Assistant-Regular',
                marginLeft: 10,
                textAlign: lang == 'en' ? 'left' : 'right',
              }}>
              {t('overAll.city')}
            </Text>

            <TextInput
              style={{
                height: isPAD ? hp(6) : 30,
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

          <View style={styles.checkBoxContainer}>
            <View
              style={{
                marginLeft: wp(3),
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: isActive ? '#2FA5EB' : 'white',
                  borderRadius: 50,
                }}
                onPress={async () => {
                  setIsActive(!isActive);
                  await toggleMarkettingApi();
                }}>
                {isActive ? (
                  <AntDesign name="checkcircleo" size={22} color={'white'} />
                ) : (
                  <>
                    <Entypo name="circle" size={20} color={'#E5E9EF'} />
                  </>
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.checkText,
                  {
                    color: isActive ? '#000000' : '#9299A3',
                  },
                ]}>
                {/* {t('overAll.termsOfUse')}{' '} */}
                <Text
                  onPress={() => handleTerms(termsOfUse)}
                  style={{
                    color: '#939393',
                    fontSize: RFS(12),
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}>
                  {t('overAll.loveSuggest')}
                </Text>
              </Text>
            </View>
            <View style={{marginTop: hp(1), marginRight: wp(5)}}>
              <Text
                style={{
                  textAlign: lang == 'en' ? 'left' : 'right',
                  fontFamily: 'Assistant',
                }}
                t>
                {t('overAll.termTextNew')}
              </Text>
            </View>
          </View>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <View style={styles.termsConditionContainer}>
              <TouchableOpacity
                onPress={() => {
                  handlePrivacy(termsLinks.policy);
                }}>
                <Text style={styles.termsConditions}>
                  {t('overAll.privacy')}
                </Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  handleEULA(termsLinks.eula);
                }}>
                <Text style={styles.termsConditions}>{t('overAll.EULA')}</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  handleTerms(termsLinks.terms);
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
