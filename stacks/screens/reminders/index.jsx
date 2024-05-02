import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useState, useEffect, useRef, useContext} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchDays,
  dispatchReminderDaysData,
  dispatchReminderSelectedDays,
  dispatchReminderTime,
} from '../../redux/actions';
import ReminderCancelModal from '../../components/ReminderCancelModal/ReminderCancelModal';
import {LoaderContext} from '../../contexts/AppLoading';
import LocalNotificationService from '../../utils/LocalNotificationService';
import {hp} from '../../dimensions/dimensions';
import notifee, {RepeatFrequency, TriggerType} from '@notifee/react-native';

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
  // console.log(
  //   '🚀 ~ file: index.jsx:47 ~ Reminders ~ initialData:',
  //   initialData,
  // );
  const userData = useSelector(state => state.userReducer);
  const {reminderTime, reminderSelectedDays, reminderDaysData, lang, days} =
    useSelector(state => state.userReducer);

  const {setLoader} = useContext(LoaderContext);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // console.log('🚀 ~ file: index.jsx:54 ~ Reminders ~ data:', data);
  const [selectedArray, setSelectedArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [Alldays, setAllDays] = useState(days ? days : []);

  const toggleSelectedDay = itemId => {
    const updatedData = data.map(item => {
      if (item.id === itemId) {
        return {...item, isSelectedDay: !item.isSelectedDay};
      }
      return item;
    });
    setData(updatedData);
  };

  useEffect(() => {
    const newArray = data.filter(item => {
      if (item.isSelectedDay === true) return item.day;
    });
    setSelectedArray(newArray);

    const daysIds = data.filter(item => item.isSelectedDay == true);
    const ids = daysIds.map(item => item.id);
    setAllDays(ids);
  }, [data]);

  // time selection function.
  const handleTimeChange = selectedTime => {
    if (selectedTime !== undefined) {
      setTime(selectedTime);
      setShowPicker(false);
    }
  };
  // Push notification UseEffect
  useEffect(() => {
    checkRedux();
  }, []);

  const checkRedux = () => {
    if (reminderTime != null) {
      setTime(reminderTime);
    }
    if (reminderSelectedDays.length !== 0) {
      setSelectedArray(reminderSelectedDays);
    }
    if (reminderDaysData.length !== 0) {
      setData(reminderDaysData);
    } else {
      setData(initialData);
    }
  };
  // Schedule the Notification.
  // async function schedulePushNotification() {
  //   if (Platform.OS == 'android') {
  //     LocalNotificationService.configure(
  //       () => {
  //         setTimeout(() => {
  //           navigation.push('Practice');
  //         }, 100);
  //       },
  //       () => {
  //         LocalNotificationService.createChannel(userData);
  //       },
  //     );
  //   } else {
  //     LocalNotificationService.iosRequestPermission();
  //     LocalNotificationService.iosListnerLocalNotification(() => {
  //       console.log('iosListnerLocalNotification Triggered');
  //       setTimeout(() => {
  //         navigation.push('Practice');
  //       }, 100);
  //     });
  //     LocalNotificationService.iosgetInitialNotification(() => {
  //       console.log('iosListnerLocalNotification Triggered');
  //       setTimeout(() => {
  //         navigation.push('Practice');
  //       }, 100);
  //     });
  //     LocalNotificationService.cancelAllNotificationsIOS();
  //     LocalNotificationService.scheduleNotificationIOS();
  //   }
  // }

  async function onDisplayNotification() {
    try {
      const today = new Date().getDay();
      const date = time;
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      if (Alldays.includes(today)) {
        console.log('true');
        const channelId = await notifee.createChannel({
          id: 'remainder',
          name: 'Remainder',
        });
        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: date.getTime(),
          repeatFrequency: RepeatFrequency.DAILY,
        };
        await notifee.createTriggerNotification(
          {
            title: 'תזכורת הכנה ל-EstaTest',
            body: `הזמן ללמוד למבחן התיווך הגיע! Estatest תעזור לכם להיות מוכנים!`,
            android: {
              channelId,
              pressAction: {
                id: 'default',
              },
              alarmManager: {
                allowWhileIdle: true,
              },
            },
          },
          trigger,
        );
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          <View style={{marginTop: hp(2)}}>
            {/* Text components and line */}
            <View style={styles.mainTextContainer}>
              <Text style={styles.textOne}>{t('overAll.improveResult')}</Text>
              <Text style={styles.textTwo}>{t('overAll.setClock')}</Text>
              <Text style={styles.textThree}>{t('overAll.whenToStart')}</Text>
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
                    value={time}
                    onConfirm={handleTimeChange}
                    onCancel={() => setShowPicker(false)}
                    is24Hour={true}
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
            <View style={{marginTop: hp(2)}}>
              {selectedArray?.length === 7 ? (
                <Text style={styles.alarmText}>
                  {t('overAll.everyDay')} {moment(time).format('hh:mm A')}
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
                      {t('overAll.at')} {moment(time).format('hh:mm A')}{' '}
                    </Text>
                  )}
                  {lang == 'he' && (
                    <Text style={styles.alarmText}>
                      {' '}
                      {t('overAll.at')} {moment(time).format('hh:mm')}
                      {moment(time).format('A')}{' '}
                    </Text>
                  )}

                  {lang == 'he' &&
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
                  dispatch(dispatchReminderTime(time));
                  dispatch(dispatchReminderSelectedDays(selectedArray));
                  dispatch(dispatchReminderDaysData(data));
                  dispatch(dispatchDays(Alldays));
                  await onDisplayNotification();
                  setTimeout(() => {
                    closeRemainderScreen();
                  }, 1000);
                }}>
                <Text style={styles.reminderText}>{t('overAll.reminder')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
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
          setTimeout(() => {
            setLoader(true);
            let empty = [];
            dispatch(dispatchReminderTime(null));
            dispatch(dispatchReminderSelectedDays(empty));
            dispatch(dispatchReminderDaysData(empty));
            dispatch(dispatchDays(empty));
            setTime(new Date());
            setData(initialData);
            setSelectedArray(empty);
            setAllDays(empty);
            LocalNotificationService.cancelAllLocalNotifications();
            if (Platform.OS === 'ios') {
              LocalNotificationService.cancelAllNotificationsIOS();
            }
            setLoader(false);
            setTimeout(() => {
              closeRemainderScreen();
            }, 1000);
          }, 100);
        }}
      />
    </View>
  );
}
