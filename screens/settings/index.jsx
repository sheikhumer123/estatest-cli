import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal';
import {LoaderContext} from '../../contexts/AppLoading';
import {useLanguage} from '../../contexts/LanguageContext';
import {hp, isPAD} from '../../dimensions/dimensions';
import messaging from '@react-native-firebase/messaging';
import {
  dispatchIsPremiumUser,
  dispatchPracticeStates,
  dispatchQuizStates,
  dispatchUserDetails,
} from '../../redux/actions';
import {
  handleEULA,
  handlePrivacy,
  handleTerms,
} from '../../utils/DefaultMethods';
import {EULA, privacyPolicy, termsOfUse} from '../../utils/defaultURLs';
import styles from './styles';
import {
  deleteToken,
  deleteUserAccount,
  updateLangApi,
  updateUserDetails,
} from '../../api/newApisToken';
import {uploadMultipleImages} from '../../utils/firebaseFunctions';
import PictureModal from '../../components/PictureModal/PictureModal';

const flag = require('../../assets/images/flag.png');
const engFlag = require('../../assets/images/english.jpg');

export default function Settings({navigation, route}) {
  const {contactData} = route.params;
  const dispatch = useDispatch();
  const {setLoader} = useContext(LoaderContext);
  const {language, onChangeLanguage} = useLanguage();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userInfoAPI, setUserInfoAPI] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userUid, setUserUid] = useState('');
  const {t} = useTranslation();
  const {termsLinks} = useSelector(state => state.userReducer);
  const [pictureModal, setPictureModal] = useState(false);

  // user information

  useEffect(() => {
    const getUserInfo = async () => {
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
    setLoader(true);
    // const devicetoken = await messaging().getToken();
    // await deleteToken({token: devicetoken});
    const res = await deleteUserAccount();
    await GoogleSignin.signOut();
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
      resetNavigationStack();
    } else {
    }
    setLoader(false);
    console.log('result : user account deleted');
  };
  // Account Disconnect.
  const handleDisconnect = async () => {
    setLoader(true);
    // const devicetoken = await messaging().getToken();
    // await deleteToken({token: devicetoken});
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('login');
    dispatch(dispatchUserDetails(null));
    dispatch(dispatchQuizStates(null));
    dispatch(dispatchPracticeStates(null));
    setLoader(false);
    resetNavigationStack();
  };

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

  const type = typeof picture == 'object' ? true : false;

  // Image picker.

  const changePicture = async () => {
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
          picture: uploadedImage[0],
        };
        const resposne = await updateUserDetails(body);
        console.log(
          '🚀 ~ file: index.jsx:151 ~ handleImagePicker ~ resposne:',
          resposne,
        );
        setLoader(false);
      })
      .catch(error => {
        if (error.message == 'User did not grant library permission.') {
          Alert.alert('Permission Required', 'Give Access to Photos', [
            {
              text: t('quiz.leaveConfirmation.cancelButton'),
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: t('quiz.leaveConfirmation.confirmBtn'),
              onPress: () => Linking.openSettings(),
            },
          ]);
        } else {
          null;
        }

        setLoader(false);
      });
  };
  const handleImagePicker = async () => {
    setPictureModal(true);
  };
  // Update User API.
  const updateUserInfo = async (img, city) => {
    if (userInfoAPI) {
      if (city === '') {
        alert('City name should not be empty.');
        return;
      } else {
        const body = {
          city: city,
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
          <AntDesign name="arrowright" size={isPAD ? 30 : 26} color={'black'} />
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
              {!contactData?.picture && (
                <Image
                  source={require('../../assets/images/refresh.png')}
                  style={styles.refreshImage}
                />
              )}
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
            <Text style={styles.changeText}>{t('overAll.changeProfile')}</Text>
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
              {isEditAble ? t('overAll.save') : t('overAll.change')}
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
                onPress={async () => {
                  onChangeLanguage('en');
                  await updateLangApi({lang: 'en'});
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
                onPress={async () => {
                  onChangeLanguage('he');
                  await updateLangApi({lang: 'he'});
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
                handlePrivacy(termsLinks.policy);
              }}>
              <Text style={styles.termsConditions}>{t('overAll.privacy')}</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleModalVisibilityChange}>
            <Text style={styles.deleteText}>{t('overAll.deleteAccount')}</Text>
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </KeyboardAwareScrollView>
      <PictureModal
        modalVisible={pictureModal}
        setModalVisible={() => setPictureModal(false)}
        onCancel={() => {
          setPictureModal(false);
        }}
        onConfirm={() => {
          setPictureModal(false);
          setTimeout(() => {
            changePicture();
          }, 1000);
        }}
      />
      <DeleteAccountModal
        visibility={deleteModalVisible}
        closeModal={() => setDeleteModalVisible(false)}
        onCancelSubmitModal={() => {
          setDeleteModalVisible(false);
        }}
        onConfirmSubmitModal={() => {
          setDeleteModalVisible(false);
          setTimeout(() => {
            deleteAccount();
          }, 200);
        }}
      />
    </View>
  );
}
