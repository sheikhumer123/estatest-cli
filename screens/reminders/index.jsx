// import moment from 'moment/moment';
import moment from 'moment-timezone';
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import ReminderCancelModal from '../../components/ReminderCancelModal/ReminderCancelModal';
import {LoaderContext} from '../../contexts/AppLoading';
import {dispatch_AllRemainders} from '../../redux/actions';
import styles from './styles';

import messaging from '@react-native-firebase/messaging';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {moderateScale} from 'react-native-size-matters';
import {hp, iosPAD} from '../../dimensions/dimensions';
import {deleteAllRemainders, setRemainder} from '../../api/newApisToken';
import * as RNLocalize from 'react-native-localize';

export default function Reminders({navigation, closeRemainderScreen}) {
  const {t} = useTranslation();
  const initialData = [
    {
      id: 6,
      label: t('overAll.saturday'),
      isSelectedDay: false,
      day: t('overAll.saturday'),
    },
    {
      id: 5,
      label: t('overAll.friday'),
      isSelectedDay: false,
      day: t('overAll.friday'),
    },
    {
      id: 4,
      label: t('overAll.thursday'),
      isSelectedDay: false,
      day: t('overAll.thursday'),
    },
    {
      id: 3,
      label: t('overAll.wednesday'),
      isSelectedDay: false,
      day: t('overAll.wednesday'),
    },
    {
      id: 2,
      label: t('overAll.tuesday'),
      isSelectedDay: false,
      day: t('overAll.tuesday'),
    },
    {
      id: 1,
      label: t('overAll.monday'),
      isSelectedDay: false,
      day: t('overAll.monday'),
    },
    {
      id: 0,
      label: t('overAll.sunday'),
      isSelectedDay: false,
      day: t('overAll.sunday'),
    },
  ];

  const {lang, days, userDetails, allRemainders, isPremiumUser} = useSelector(
    state => state.userReducer,
  );

  const dispatch = useDispatch();
  const {setLoader} = useContext(LoaderContext);
  const [data, setData] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [Alldays, setAllDays] = useState(days ? days : []);
  const [daysForApi, setDaysForApi] = useState([]);
  const deviceTimeZone = RNLocalize.getTimeZone();

  useEffect(() => {
    const newArray = data.filter(item => {
      if (item.isSelectedDay === true) return item.day;
    });
    const getSelectedDays = data.filter(item => {
      if (item.isSelectedDay === true) return item.day;
    });
    const allDaysForApi = getSelectedDays.map(item => {
      return item.day;
    });

    if (allDaysForApi.includes('א')) {
      const index = allDaysForApi.indexOf('א׳');
      allDaysForApi[index] = 'Sun';
    }
    if (allDaysForApi.includes('ב׳')) {
      const index = allDaysForApi.indexOf('ב׳');
      allDaysForApi[index] = 'Mon';
    }
    if (allDaysForApi.includes('ג')) {
      const index = allDaysForApi.indexOf('ג׳');
      allDaysForApi[index] = 'Tue';
    }
    if (allDaysForApi.includes('ד')) {
      const index = allDaysForApi.indexOf('ד׳');
      allDaysForApi[index] = 'Wed';
    }
    if (allDaysForApi.includes('ה׳')) {
      const index = allDaysForApi.indexOf('ה׳');
      allDaysForApi[index] = 'Thur';
    }
    if (allDaysForApi.includes('ו׳')) {
      const index = allDaysForApi.indexOf('ו׳');
      allDaysForApi[index] = 'Fri';
    }
    if (allDaysForApi.includes('שבת')) {
      const index = allDaysForApi.indexOf('שבת');
      allDaysForApi[index] = 'Sat';
    }

    setDaysForApi(allDaysForApi);
    setSelectedArray(newArray);

    const daysIds = data.filter(item => item.isSelectedDay == true);
    const ids = daysIds.map(item => item.id);
    setAllDays(ids);
  }, [data]);

  const setRemainderfunc = async () => {
    let userLocalTime = moment.tz(time, deviceTimeZone).format();
    const selDays = data.filter((item, index) => item.isSelectedDay == true);
    const allDays = selDays.map(item => item.id);
    const authStatus = await messaging().requestPermission();
    if (authStatus == 1) {
      const body = {
        date: userLocalTime,
        days: allDays,
        localTime: time,
      };
      await setRemainder(body);
    }
  };

  const deleteAllRemaindersInDB = async () => {
    await deleteAllRemainders();
  };

  const toggleSelectedDay = itemId => {
    const updatedData = data.map(item => {
      if (item.id === itemId) {
        return {...item, isSelectedDay: !item.isSelectedDay};
      }
      return item;
    });
    setData(updatedData);
  };

  const handleTimeChange = selectedTime => {
    if (selectedTime !== undefined) {
      setTime(selectedTime);
      setShowPicker(false);
    }
  };

  useEffect(() => {
    checkRedux();
    hideNavigationBar();
  }, []);

  const checkRedux = () => {
    if (allRemainders.length !== 0) {
      const userRemainderData = allRemainders.filter(
        item => item.id === userDetails.uid,
      );

      if (userRemainderData.length !== 0) {
        // setTime(userRemainderData[0].time);
      }
      if (userRemainderData.length !== 0) {
        if (userRemainderData?.selectedArray?.length !== 0) {
          setSelectedArray(userRemainderData[0].selectedArray);
        }
      }
      if (userRemainderData.length !== 0) {
        setData(userRemainderData[0].days);
      } else {
        setData(initialData);
      }
    } else {
      setData(initialData);
    }
  };

  const addRemainder = () => {
    const findIndex = allRemainders.findIndex(
      item => item.id === userDetails.uid,
    );
    if (findIndex == -1) {
      dispatch(
        dispatch_AllRemainders([
          ...allRemainders,
          {
            Alldays: Alldays,
            time: time,
            days: data,
            selectedArray: selectedArray,
            id: userDetails.uid,
            test: 'test',
          },
        ]),
      );
    } else {
      const newRemainder = {
        Alldays: Alldays,
        time: time,
        days: data,
        selectedArray: selectedArray,
        id: userDetails.uid,
        test: 'test10',
      };
      const copy = [...allRemainders];
      copy[findIndex] = newRemainder;
      dispatch(dispatch_AllRemainders(copy));
    }
  };

  const removeRemainder = () => {
    const findIndex = allRemainders.findIndex(
      item => item.id === userDetails.uid,
    );
    const copy = [...allRemainders];
    copy.splice(findIndex, 1);
    dispatch(dispatch_AllRemainders(copy));
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        // source={require('../../assets/images/houseBg.png')}
        // style={styles.bgWrap}
        resizeMode="contain"></ImageBackground>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require('../../assets/images/houseBg.png')}
          style={styles.bgWrap2}
          resizeMode="contain"></ImageBackground>
        {/* cancel component */}
        <TouchableOpacity
          onPress={closeRemainderScreen}
          style={styles.cancelContainer}>
          <Text style={styles.cancelText}>{t('overAll.cancelation')}</Text>
        </TouchableOpacity>

        <View style={{marginTop: hp(1), flex: 1}}>
          <View
            style={{marginTop: iosPAD ? hp(0) : lang == 'he' ? hp(2) : hp(0)}}>
            {/* Text components and line */}
            <View style={styles.mainTextContainer}>
              <Text style={styles.textOne}>{t('overAll.improveResult')}</Text>
              <Text
                style={[
                  styles.textTwo,
                  {
                    fontSize:
                      Platform.OS == 'ios'
                        ? lang == 'en'
                          ? moderateScale(14)
                          : moderateScale(16)
                        : moderateScale(14),
                  },
                ]}>
                {t('overAll.setClock')}
              </Text>
              <Text
                style={[
                  styles.textThree,
                  {
                    fontSize:
                      lang == 'en' ? moderateScale(22) : moderateScale(25),
                  },
                ]}>
                {t('overAll.whenToStart')}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          {/* Buttons container */}
          <View style={styles.buttonContainer}>
            <View>
              <View style={styles.recommendContainer}>
                <Text style={styles.recommendSetting}>
                  {t('overAll.recommendSettings')}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    setShowPicker(true);
                  } else {
                    setShowPicker(true);
                  }
                }}
                style={styles.alarmContainer}>
                <Image
                  source={require('../../assets/images/alarm.png')}
                  resizeMode="contain"
                  style={styles.alarmImage}
                />
                <Text style={styles.timer}>{moment(time).format('HH:mm')}</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                {showPicker && (
                  <DateTimePickerModal
                    mode="time"
                    isVisible={showPicker}
                    disabled="clock"
                    // value={time}
                    onConfirm={handleTimeChange}
                    onCancel={() => setShowPicker(false)}
                    is24Hour={true}
                    date={new Date()}
                  />
                )}
              </View>
              <View style={styles.repeatContainer}>
                <Text style={styles.repeat}>{t('overAll.repeat')}</Text>
              </View>
              <View style={styles.daysContainer}>
                <FlatList
                  contentContainerStyle={{justifyContent: 'space-between'}}
                  data={data}
                  horizontal
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => toggleSelectedDay(item.id)}
                        style={
                          item?.isSelectedDay
                            ? styles.dayStyleActive
                            : styles.dayStyle
                        }>
                        <Text
                          style={[
                            styles.dayText,
                            {color: item?.isSelectedDay ? 'white' : '#2FA2EB'},
                          ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: hp(0)}}>
              {selectedArray?.length === 7 ? (
                <Text style={styles.alarmText}>
                  {t('overAll.everyDay')} {moment(time).format('HH:mm ')}
                </Text>
              ) : selectedArray?.length !== 0 ? (
                <View style={styles.daysContainerStyle}>
                  {lang == 'en' && (
                    <Text style={styles.alarmText}>{t('overAll.every')}</Text>
                  )}
                  {lang == 'en' &&
                    selectedArray.map((item, index) => {
                      return (
                        <Text style={styles.alarmText}>
                          {item?.day}
                          {selectedArray.length === 0 ||
                          selectedArray.length === 1
                            ? ''
                            : selectedArray.length - 2 === index
                            ? t('overAll.and')
                            : selectedArray.length - 1 === index
                            ? ''
                            : ','}{' '}
                        </Text>
                      );
                    })}
                  {lang == 'en' && (
                    <Text style={styles.alarmText}>
                      {' '}
                      {t('overAll.at')} {moment(time).format('HH:mm')}{' '}
                    </Text>
                  )}
                  {lang == 'he' && (
                    <Text style={styles.alarmText}>
                      {' '}
                      {t('overAll.at')} {moment(time).format('HH:mm')}
                    </Text>
                  )}

                  {lang == 'he' &&
                    selectedArray.map((item, index) => {
                      return (
                        <Text style={styles.alarmText}>
                          {item?.day}
                          {index < selectedArray.length - 0 && ', '}

                          {
                            // selectedArray.length === 0 ||
                            // selectedArray.length === 1
                            //   ? ''
                            //   : selectedArray.length - 2 === index
                            //   ? t('overAll.and')
                            //   : selectedArray.length - 1 === index
                            //   ? ''
                            //   : ','}{' '}
                          }
                        </Text>
                      );
                    })}

                  {lang == 'he' && (
                    <Text style={styles.alarmText}> {t('overAll.every')} </Text>
                  )}
                </View>
              ) : null}
              <TouchableOpacity
                disabled={selectedArray.length >= 1 ? false : true}
                activeOpacity={0.5}
                style={
                  selectedArray.length >= 1
                    ? styles.reminderButton
                    : styles.reminderButtonDisabled
                }
                onPress={async () => {
                  if (isPremiumUser) {
                    setLoader(true);
                    addRemainder();
                    setRemainderfunc();
                    setLoader(false);
                    setTimeout(() => {
                      closeRemainderScreen();
                    }, 1000);
                    return;
                  }
                  Alert.alert(
                    t('overAll.remainderErrorTitle'),
                    t('overAll.remainderErrorDesc'),
                  );
                }}>
                <Text style={styles.reminderText}>{t('overAll.reminder')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={allRemainders.length > 0 ? false : true}
                activeOpacity={0.5}
                style={styles.delReminderButton}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styles.delReminder}>
                  {t('overAll.delReminder')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ReminderCancelModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onConfirm={() => {
          setModalVisible(false);
          setLoader(true);
          setTimeout(() => {
            deleteAllRemaindersInDB();
            removeRemainder();
            setTime(new Date());
            setData(initialData);
            setTimeout(() => {
              setLoader(false);
              closeRemainderScreen();
            }, 1000);
          }, 100);
        }}
      />
    </View>
  );
}
