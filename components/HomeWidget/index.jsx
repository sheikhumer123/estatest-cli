import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import RoundedBox from '../RoundedBox';
import styles from './styles';
import {t} from 'i18next';
import Buttons from '../Buttons/Buttons';
import {useSelector} from 'react-redux';
import moment from 'moment';

function Widget({
  type,
  bottomSheetHandler,
  setIsSelected,
  isSelected,
  isPremiumUser,
  loading,
}) {
  const {quizStatistics, practiceStatistics, lang, allRemainders} = useSelector(
    state => state.userReducer,
  );

  return (
    <View style={styles.container}>
      {/* Practice Component */}
      {type === 'Practice' && (
        <Animated.View
          entering={SlideInDown.duration(350).delay(0)}
          exiting={SlideOutDown.duration(350).delay(0)}
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <RoundedBox isPremiumUser={isPremiumUser}>
            <Text
              style={[
                styles.titleTop,
                {color: isPremiumUser ? '#3392EA' : '#add3f7'},
              ]}>
              {isPremiumUser
                ? practiceStatistics
                  ? practiceStatistics.totalQuestions
                  : 0
                : '1023'}
              {/* {isPremiumUser ? practiceStatistics?.totalQuestions : '1023'} */}
            </Text>
            <Text
              style={[
                styles.subtitle,
                {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
              ]}>
              {t('widgets.questionsPracticed')}
            </Text>
          </RoundedBox>
          <RoundedBox>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: isPremiumUser ? '#09A719' : '#9ddca3'},
                  ]}>
                  {isPremiumUser
                    ? practiceStatistics
                      ? parseFloat(
                          practiceStatistics?.avgQuestionTimeTakenMs,
                        ).toFixed(1)
                      : 0
                    : 50}
                  <Text style={styles.minutes}>שנ׳</Text>
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
                  ]}>
                  {t('widgets.averageTimeQuestion')}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: isPremiumUser ? '#3392EA' : '#add3f7'},
                  ]}>
                  {isPremiumUser
                    ? practiceStatistics
                      ? practiceStatistics.totalCorrectAnswers
                      : 0
                    : '80'}
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
                  ]}>
                  {t('widgets.correctAnswers')}
                </Text>
              </View>
            </View>
          </RoundedBox>
        </Animated.View>
      )}

      {/* Quiz Component */}
      {type === 'Quiz' && (
        <Animated.View
          entering={SlideInDown.duration(350).delay(0)}
          exiting={SlideOutDown.duration(350).delay(0)}
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <RoundedBox>
            <View>
              <Text
                style={[
                  styles.titleTop,
                  {color: isPremiumUser ? '#09A719' : '#9ddca3'},
                ]}>
                {isPremiumUser
                  ? quizStatistics
                    ? parseFloat(quizStatistics.avgGrade).toFixed(0)
                    : '0'
                  : '100'}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
                ]}>
                {t('widgets.gradesAverage')}
              </Text>
            </View>
          </RoundedBox>

          <RoundedBox>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: isPremiumUser ? '#09A719' : '#9ddca3'},
                  ]}>
                  {isPremiumUser
                    ? quizStatistics
                      ? parseFloat(quizStatistics?.avgTimeTakenMin).toFixed(1)
                      : '0'
                    : 50}
                  <Text style={styles.minutes}>דק׳</Text>
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
                  ]}>
                  {t('widgets.averageTime')}
                </Text>
              </View>
              {/* <View style={{marginHorizontal: 15, }}/> */}
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: isPremiumUser ? '#3392EA' : '#add3f7'},
                  ]}>
                  {isPremiumUser
                    ? quizStatistics?.totalExams
                      ? quizStatistics?.totalExams
                      : '0'
                    : '35'}
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {color: isPremiumUser ? '#155B96' : '#a1bdd5'},
                  ]}>
                  {t('widgets.testPerform')}
                </Text>
              </View>
            </View>
          </RoundedBox>
        </Animated.View>
      )}
      {/* Reminders Component / Component is made but not to show in the non-premium user. */}
      {type === 'Reminders' && isPremiumUser && allRemainders[0]?.time && (
        <Animated.View
          entering={SlideInDown.duration(350).delay(0)}
          exiting={SlideOutDown.duration(350).delay(0)}
          style={{flex: 1}}>
          <View style={styles.alarmContainer}>
            <Image
              source={require('../../assets/images/alarm.png')}
              resizeMode="contain"
              style={styles.alarmImage}
            />
            <Text style={styles.timer}>
              {moment(allRemainders[0].time).format('HH:mm')}
            </Text>
          </View>
          {/* <View style={styles.repeatContainer}>
            <Text style={styles.repeat}>{t('overAll.repeat')}</Text>
          </View> */}
          {/* <View style={styles.daysSelectedContainer}>
            <Text style={styles.daysText}>{t('overAll.daysSelected')}</Text>
          </View> */}

          {/* FlatList Container */}
          <View style={styles.daysContainer}>
            {allRemainders[0].selectedArray?.length === 7 ? (
              <Text style={styles.alarmText}>
                {t('overAll.everyDay')}{' '}
                {moment(allRemainders[0].time).format('HH:mm')}
              </Text>
            ) : allRemainders[0].selectedArray?.length !== 0 ? (
              <View style={styles.daysContainerStyle}>
                {lang == 'en' && (
                  <Text style={styles.alarmText}>{t('overAll.every')}</Text>
                )}
                {lang == 'en' &&
                  allRemainders[0].selectedArray.map((item, index) => {
                    return (
                      <Text style={styles.alarmText}>
                        {item?.day}
                        {allRemainders[0].selectedArray.length === 0 ||
                        allRemainders[0].selectedArray.length === 1
                          ? ''
                          : allRemainders[0].selectedArray.length - 2 === index
                          ? ' and'
                          : allRemainders[0].selectedArray.length - 1 === index
                          ? ''
                          : ','}{' '}
                      </Text>
                    );
                  })}
                <Text style={styles.alarmText}>
                  {' '}
                  {t('overAll.at')}{' '}
                  {moment(allRemainders[0].time).format('HH:mm')}{' '}
                </Text>
                {lang == 'he' &&
                  allRemainders[0].selectedArray.map((item, index) => {
                    return (
                      <Text style={styles.alarmText}>
                        {item?.day}
                        {allRemainders[0].selectedArray.length === 0 ||
                        allRemainders[0].selectedArray.length === 1
                          ? ''
                          : allRemainders[0].selectedArray.length - 2 === index
                          ? ' and'
                          : allRemainders[0].selectedArray.length - 1 === index
                          ? ''
                          : ','}{' '}
                      </Text>
                    );
                  })}

                {lang == 'he' && <Text style={styles.alarmText}>כל </Text>}
              </View>
            ) : null}
            <View style={styles.width} />
            <FlatList
              data={allRemainders[0].days}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <View
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
                  </View>
                );
              }}
            />
          </View>
        </Animated.View>
      )}
      {/* {renderWidget(type)} */}
      {!isPremiumUser && (
        <View style={styles.overlay}>
          <Buttons
            homePremiumBtn
            innerTxt={t('premium.cta')}
            onPress={bottomSheetHandler}
          />
        </View>
      )}
    </View>
  );
}

export default Widget;
