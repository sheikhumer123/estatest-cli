import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../../screens/quiz/styles';
import {RFS, hp, wp} from '../../dimensions/dimensions';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Answer = ({
  answer,
  index,
  selectedAnswerIndex,
  handleAnswerPress,
  hasCompleted,
  isCorrect,
}) => {
  const {lang} = useSelector(state => state.userReducer);
  const getBackgroundColor = () => {
    if (hasCompleted && isCorrect) {
      return '#60B941';
    }

    if (hasCompleted && selectedAnswerIndex === index) {
      return '#F56F6F';
    }

    if (selectedAnswerIndex === index) {
      return;
    }

    return '#D4D4D4';
  };

  // const getTextColor = () => {
  //   if (hasCompleted && isCorrect) {
  //     return '#60B941';
  //   }

  //   if (hasCompleted && selectedAnswerIndex === index) {
  //     return '#F56F6F';
  //   }

  //   if (selectedAnswerIndex === index) {
  //     return '#2fa2eb';
  //   }

  //   return 'black';
  // };

  return (
    <View style={styles.answer1}>
      <TouchableOpacity
        style={styles.answer1}
        onPress={() => {
          if (!hasCompleted) handleAnswerPress(index);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={
            selectedAnswerIndex == index
              ? ['#3550DC', '#27E9F7']
              : ['#cccc', '#cccc']
          }
          style={{
            height: 40,
            borderRadius: 50,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99,
          }}>
          <View
            style={[
              styles.answerButton,
              {backgroundColor: getBackgroundColor()},
            ]}>
            <Text style={[styles.answerIndex]}>
              {index == 0
                ? lang == 'en'
                  ? 1
                  : 'א'
                : index == 1
                ? lang == 'en'
                  ? 2
                  : 'ב'
                : index == 2
                ? lang == 'en'
                  ? 3
                  : 'ג'
                : index == 3
                ? lang == 'en'
                  ? 4
                  : 'ד'
                : ''}
            </Text>
          </View>
        </LinearGradient>

        <Text
          style={{
            fontSize: RFS(13),
            textAlign: 'right',
            flexGrow: 1,
            paddingRight: 15,
            paddingLeft: 50,
            maxWidth: '100%',
            textAlignVertical: 'center',
            fontFamily: 'Assistant-Regular',
            color: 'black',
            // fontWeight: '600',
          }}>
          {answer}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Answer;
