import {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useLanguage} from '../../contexts/LanguageContext';
import {useAuth} from '../../contexts/AuthContext';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  deleteUserAccount,
  getUserDetails,
  updateUserDetails,
  updateUserProfileImage,
} from '../../api/api';
import {LoaderContext} from '../../contexts/AppLoading';
import auth from '@react-native-firebase/auth';
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal';
import {hp} from '../../dimensions/dimensions';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {privacyPolicy, termsOfUse} from '../../utils/defaultURLs';
import {useDispatch} from 'react-redux';
import {
  dispatchIsPremiumUser,
  dispatchQuizStates,
  dispatchPracticeStates,
  dispatchUserDetails,
} from '../../redux/actions';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {uploadMultipleImages} from '../../../utils/firebaseFunctions';

const flag = require('../../assets/images/flag.png');
const engFlag = require('../../assets/images/english.jpg');
export default function Settings({navigation, route}) {
  const {contactData} = route.params;
  console.log({'contactData-': contactData});
  const dispatch = useDispatch();
  const {setLoader} = useContext(LoaderContext);
  const {language, onChangeLanguage} = useLanguage();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userInfoAPI, setUserInfoAPI] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userUid, setUserUid] = useState('');
  const {t} = useTranslation();
  // user information

  useEffect(() => {
    const getUserInfo = async () => {
      // const user = await AsyncStorage.getItem('user');
      // setUserInfo(user);
      setUserInfoAPI(contactData);
      setUserUid(contactData.uid);
      if (contactData) {
        setEmail(contactData.email);
        setPhone(contactData.phone);
        setCity(contactData.city);
        setPicture(contactData.picture);
      }
    };
    getUserInfo();
  }, []);
  // delete Account API

  const deleteAccount = async () => {
    try {
      setLoader(true);
      const res = await deleteUserAccount(userUid);
      console.log(res);
      await AsyncStorage.setItem('isFirstContact', '0');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('examRemember');
      dispatch(dispatchUserDetails(null));
      dispatch(dispatchIsPremiumUser(false));
      dispatch(dispatchQuizStates(null));
      dispatch(dispatchPracticeStates(null));
      if (res) {
        setDeleteModalVisible(false);
        navigation.navigate('Login');
      } else {
        alert('there error to delete user');
      }
      setLoader(false);
      console.log('result : user account deleted');
    } catch (error) {
      console.log(error);
    }
  };
  // Account Disconnect.
  const handleDisconnect = async () => {
    setLoader(true);
    auth()
      .signOut(auth)
      .then(async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        dispatch(dispatchUserDetails(null));
        dispatch(dispatchIsPremiumUser(false));
        dispatch(dispatchQuizStates(null));
        dispatch(dispatchPracticeStates(null));
        resetNavigationStack();
        setLoader(false);
        console.log('result : user account disconnected.');
      })
      .catch(async error => {
        console.log(error);
        if (error.code === 'auth/no-current-user') {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('token');
          resetNavigationStack();
          console.log('result : user account disconnected.');
        }
        setLoader(false);
      });
  };
  // Modal Handler
  const handleModalVisibilityChange = () => {
    setDeleteModalVisible(true);
  };
  // languages list
  const languages = [
    {label: 'English', value: 'en'},
    {label: 'Hebrew', value: 'he'},
  ];
  const resetNavigationStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  };
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [picture, setPicture] = useState('');
  const [isEditAble, setIsEditAble] = useState(false);

  const handleImagePicker = async () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    })
      .then(async image => {
        setLoader(true);
        setPicture(image?.path);
        const uploadedImage = await uploadMultipleImages([image]);
        const body = {
          city: city,
          email: userInfoAPI?.email,
          name: userInfoAPI?.name,
          phone: userInfoAPI?.phone,
          picture: uploadedImage || '',
          uid: userInfoAPI?.uid,
        };

        const resposne = await updateUserDetails(body);
        console.log(
          '🚀 ~ file: index.jsx:151 ~ handleImagePicker ~ resposne:',
          resposne,
        );
        await updateUserInfo(image?.path, city);
        setLoader(false);
      })
      .catch(error => {
        console.log(
          '🚀 ~ file: index.jsx:146 ~ handleImagePicker ~ error:',
          error.response,
        );
        setLoader(false);
      });
  };
  // Update User API.
  const updateUserInfo = async (img, city) => {
    if (userInfoAPI) {
      if (img === '') {
        alert('Image should not be empty.');
        return;
      } else if (city === '') {
        alert('City name should not be empty.');
        return;
      } else {
        const body = {
          city: city,
          email: userInfoAPI?.email,
          name: userInfoAPI?.name,
          phone: userInfoAPI?.phone,
          picture: img,
          uid: userInfoAPI?.uid,
        };
        const result = await updateUserDetails(body);
        console.log(
          '🚀 ~ file: index.jsx:168 ~ updateUserInfo ~ result:',
          result,
        );
        setLoader(false);
      }
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/houseBg.png')}
          style={styles.bgWrap}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelContainer}>
          <AntDesign name="arrowright" size={26} color={'black'} />
        </TouchableOpacity>
        <View style={styles.definitionsContainer}>
          <Text style={styles.definitionsText}>{t('overAll.definitions')}</Text>
        </View>

        {/* Image Container */}
        <View style={styles.infoContainer}>
          <View style={styles.imageContainerMain}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={
                  picture
                    ? {uri: picture}
                    : require('../../assets/images/userimag2.jpg')
                }
                style={styles.userImage}
              />
              <Image
                source={require('../../assets/images/refresh.png')}
                style={styles.refreshImage}
              />
            </View>
            {/* Name */}
            <Text style={styles.userName}>
              {userInfoAPI?.name === undefined ||
              userInfoAPI?.name === null ||
              userInfoAPI?.name === ''
                ? `Name`
                : userInfoAPI?.name}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              handleImagePicker();
            }}>
            <Text style={styles.changeText}>{'Change Profile Image'}</Text>
          </TouchableOpacity>
        </View>
        {/* Email Container */}
        <View style={styles.emailContainer}>
          <Text style={styles.headingText}>{t('overAll.emailUser')}</Text>
          <TextInput
            style={styles.inputBlur}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            editable={false}
          />
        </View>
        {/* Number Container */}
        <View style={styles.emailContainer}>
          <Text style={styles.headingText}>{t('overAll.phone')}</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#bbb"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={false}
          />
        </View>
        {/* City Container */}
        <View style={styles.cityContainer}>
          <View>
            <Text style={styles.headingText}>{t('overAll.city')}</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="#bbb"
              value={city}
              onChangeText={setCity}
              editable={isEditAble}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={async () => {
              if (!isEditAble) {
                setIsEditAble(true);
              } else {
                if (userInfoAPI) {
                  setLoader(true);
                  await updateUserInfo(picture, city);
                  setIsEditAble(false);
                } else {
                  alert('User data not available, try again');
                }
              }
            }}>
            <Text style={styles.changeText}>
              {isEditAble ? 'Save' : 'Change'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Language Container */}
        <View style={styles.languageContainer}>
          <Text style={styles.headingText}>{t('overAll.lang')}</Text>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={() => {
              setOpen(!open);
            }}>
            <Text style={styles.valueText}>
              {language === 'en' ? t('overAll.english') : t('overAll.hebrew')}
            </Text>
            <Image
              source={language === 'en' ? engFlag : flag}
              style={styles.flagImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {/* Language Change Container */}
          {open && (
            <View style={styles.languageChangeContainer}>
              <Text style={styles.selectText}>{t('overAll.prefer')}</Text>
              <TouchableOpacity
                style={styles.englishContainer}
                onPress={() => {
                  onChangeLanguage('en');
                  setOpen(false);
                }}>
                <Text style={styles.englishText}>{t('overAll.english')}</Text>
                <Image
                  source={engFlag}
                  style={styles.flagImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hebrewContainer}
                onPress={() => {
                  onChangeLanguage('he');
                  setOpen(false);
                }}>
                <Text style={styles.hebrewText}>{t('overAll.hebrew')}</Text>
                <Image
                  source={flag}
                  style={styles.flagImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Button Container */}
        <View
          style={[styles.buttonContainer, {marginTop: open ? hp(5) : hp(2)}]}>
          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={handleDisconnect}>
            <Text style={styles.deleteText}>{t('overAll.disconnect')}</Text>
          </TouchableOpacity>
          <View style={styles.termsConditionContainer}>
            <TouchableOpacity
              onPress={() => {
                handlePrivacy(privacyPolicy);
              }}>
              <Text style={styles.termsConditions}>{t('overAll.privacy')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                handleTerms(termsOfUse);
              }}>
              <Text style={styles.termsConditions}>{t('overAll.terms')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleModalVisibilityChange}>
            <Text style={styles.deleteText}>{t('overAll.deleteAccount')}</Text>
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </KeyboardAwareScrollView>
      <DeleteAccountModal
        visibility={deleteModalVisible}
        closeModal={() => setDeleteModalVisible(false)}
        onCancelSubmitModal={() => {
          setDeleteModalVisible(false);
        }}
        onConfirmSubmitModal={deleteAccount}
      />
    </View>
  );
}
