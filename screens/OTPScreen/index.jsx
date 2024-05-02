import React, {useContext, useEffect, useState} from 'react';
import getStyles from './styles';
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {hp, wp} from '../../dimensions/dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import otpImage from '../../assets/images/otpImage.png';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../components/IconButton/IconButton';
import {useSelector} from 'react-redux';
import {sendOTP, verifyOTP, verifyOTPReset} from '../../api/newApis';
import TimerOTP from './TimerOTP';
import {LoaderContext} from '../../contexts/AppLoading';

const OTPScreen = ({}) => {
  const data = useRoute();
  const user = data?.params?.data?.user;
  const check = data?.params?.data?.check || false;
  const {lang} = useSelector(state => state.userReducer);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = getStyles(lang);
  const {t} = useTranslation();
  const refs = [];
  const [otp, setOtp] = useState(['', '', '', '']);
  const joindOtp = otp?.join('');
  const number = '03225522460';
  const dottedNum = number.slice(0, number.length - 4);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timer, setTimer] = useState(false);
  const [showError, setShowError] = useState(false);
  const [mode, setMode] = useState(false);
  const [sendAgain, setSendAgain] = useState(false);
  const {setLoader} = useContext(LoaderContext);

  const focusNext = index => {
    if (index < 3) {
      refs[index + 1].focus();
    }
  };

  useEffect(() => {
    if (check && joindOtp.length >= 4) {
      veriftRestOTP();
      return;
    }
    if (!check && joindOtp.length >= 4) {
      verifyOtpProcess();
    }
  }, [joindOtp]);

  const handleOtpChange = (text, index) => {
    if (/^\d{0,1}$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
    }
  };

  const onTimeOut = () => {
    setTimer(false);
    setTimeLeft(30);
  };

  useEffect(() => {
    sendOTPprocess();
  }, []);

  const sendOTPprocess = async () => {
    setTimer(true);
    const body = {
      email: data.params.data.name,
    };
    const result = await sendOTP(body);
    console.log(result);
  };

  const veriftRestOTP = async () => {
    const body = {
      email: data?.params?.data?.name,
      otp: joindOtp,
    };
    setLoader(true);
    await verifyOTPReset(body)
      .then(async result => {
        setTimeout(() => {
          setLoader(false);
          navigation.navigate('ResetPasswordScreen', {
            email: data?.params?.data?.name,
          });
        }, 1000);
      })
      .catch(err => {
        setLoader(false);
        setShowError(true);
      });
  };

  const verifyOtpProcess = async () => {
    const body = {
      email: data?.params?.data?.name,
      otp: joindOtp,
      uid: data?.params?.data?.uid,
    };
    setLoader(true);
    await verifyOTP(body)
      .then(async result => {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setLoader(false);
        setTimeout(() => {
          navigation.replace('MainStack');
        }, 1000);
      })
      .catch(err => {
        setShowError(true);
        setLoader(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 4500);
  }, [showError]);

  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/houseBg.png')}
          style={styles.bgWrap2}
          resizeMode="cover"></ImageBackground>
        <KeyboardAwareScrollView
          style={{paddingTop: insets.top}}
          showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginUser')}
              style={{alignSelf: 'flex-end', right: wp(5)}}>
              <AntDesign name="arrowright" size={26} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <View style={styles.otpImage}>
              <Image
                source={otpImage}
                style={styles.img}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.selectorSec}>
            <View style={styles.sec}>
              <View style={styles.phone}>
                {!mode ? (
                  <Text>{data.params.data.name}</Text>
                ) : (
                  <>
                    <Text style={styles.number}>{dottedNum}</Text>
                    <Text style={styles.dots}>****</Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.sec2}>
              <View>
                <Text style={styles.title1}>{t('overAll.AccountVerify')}</Text>
                <Text style={styles.title2}>
                  {mode ? t('overAll.codeSend') : t('overAll.codeSend2')}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  onChangeText={text => {
                    handleOtpChange(text, index);
                    if (text.length === 1) {
                      focusNext(index);
                    }
                    62;
                  }}
                  value={digit}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={ref => (refs[index] = ref)}
                  placeholderTextColor={'red'}
                />
              ))}
            </View>
            {showError && (
              <View style={styles.errorContainer}>
                <Text style={styles.wrongCode}>
                  {t('overAll.invalidCocde')}
                </Text>
              </View>
            )}

            <View style={styles.sendAgainContainer}>
              <Text style={styles.didntGet}>{t('overAll.didntGetCode')}</Text>
              <TouchableOpacity disabled={timer} onPress={sendOTPprocess}>
                <Text style={styles.sendAgain}>{t('overAll.sendMeAgain')}</Text>
              </TouchableOpacity>
              {timer && (
                <View style={styles.Timer}>
                  <Text style={styles.timerText}>
                    <TimerOTP
                      onTimeOut={onTimeOut}
                      timeLeft={timeLeft}
                      setTimeLeft={setTimeLeft}
                    />
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.submitBtn}>
              <IconButton
                disabled={joindOtp?.length >= 4 ? false : true}
                onPress={check ? veriftRestOTP : verifyOtpProcess}
                icon={true}
                tick={true}
                text={t('overAll.AccountVerification')}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default OTPScreen;
