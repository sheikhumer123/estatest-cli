import React, {useContext, useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, Platform} from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {LoaderContext} from '../../contexts/AppLoading';
import {RFS, hp, wp} from '../../dimensions/dimensions';
import {useSelector} from 'react-redux';

const Results = ({
  questions,
  answers,
  navigation,
  setQuestionIndex,
  timeLeft,
  questionIndex,
  onClose,
  onExamSubmit,
  closeQuizPageSheet,
  setShowPageQuiz,
  setTriggerPremiumModal,
}) => {
  const FlatListComponent =
    Platform.OS === 'android'
      ? require('react-native-gesture-handler').FlatList
      : require('react-native').FlatList;

  const {lang} = useSelector(state => state.userReducer);
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const [isActive, setIsActive] = useState(false);
  const totalTimeTakenSec = 7200 - timeLeft;
  const TTTM = totalTimeTakenSec / 60;
  const numQuestions = questions.length;
  const averageTimeInSeconds = totalTimeTakenSec / numQuestions;
  const averageTimeInMilliseconds = averageTimeInSeconds * 1000;

  const correctAnswers = questions.reduce(
    (accumulator, currentValue, index) => {
      if (currentValue.correctAnswer === answers[index]) {
        return accumulator + 1;
      }
      return accumulator;
    },
    0,
  );

  const exitQuizTest = () => {
    setShowPageQuiz(false);
    setTriggerPremiumModal(prevNumber => prevNumber + 1);
    setTimeout(() => {
      closeQuizPageSheet();
    }, 20);
  };

  return (
    <View style={styles.resultsContainer}>
      <View>
        {correctAnswers >= 15 ? (
          <>
            <Text style={styles.resultsTitle}>{t('quiz.results.title')}</Text>
            <Text style={styles.resultsTitleMini}>
              {t('quiz.results.miniTitle')}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.resultsTitle}>
              {t('quiz.results.titleLess')}
            </Text>
            <Text style={styles.resultsTitleMini}>
              {t('overAll.ifPreserve')}
            </Text>
          </>
        )}

        <Text style={styles.resultsSubtitle}>
          {t('quiz.results.subtitle').replace('{}', correctAnswers)}
        </Text>
      </View>
      {/* flatList Here */}
      <View>
        <FlatListComponent
          style={{
            marginTop: hp(2),
            width: '100%',
          }}
          contentContainerStyle={{paddingBottom: hp(35)}}
          data={questions}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const isCorrect = questions[index].correctAnswer === answers[index];
            return (
              <>
                <TouchableOpacity
                  style={styles.answer}
                  activeOpacity={0.5}
                  onPress={() => {
                    setQuestionIndex(index);
                    setIsActive(!isActive);
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={[
                        styles.answerButton,
                        {backgroundColor: isCorrect ? '#4CAF34' : 'red'},
                      ]}>
                      <Text style={[styles.answerIndex]}>{index + 1}</Text>
                    </View>
                    <View style={styles.line1} />
                  </View>
                  <View style={styles.resultsQuestion}>
                    {/* change number of lines numberOfLines={2} */}
                    <Text style={[styles.questionText]}>{item.question}</Text>
                  </View>
                </TouchableOpacity>
                {isActive && questionIndex === index ? (
                  <View style={styles.mainContainerAnswers}>
                    <FlatListComponent
                      data={item.answers}
                      keyExtractor={item => item}
                      renderItem={itemAnswer => {
                        const isCorrectAnswer =
                          questions[questionIndex]?.correctAnswer ===
                          itemAnswer?.index
                            ? true
                            : false;
                        const isWrongAnswer =
                          itemAnswer?.index === answers[questionIndex]
                            ? true
                            : false;
                        return (
                          <View style={[styles.answerContainerStyle]}>
                            <View
                              style={[
                                styles.answerButton1,
                                isWrongAnswer && {backgroundColor: '#D4D4D4'},
                                isCorrectAnswer && {backgroundColor: '#4CAF34'},
                              ]}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: 'white',
                                  fontSize: RFS(16),
                                  fontFamily: 'Assistant-Regular',
                                }}>
                                {itemAnswer?.index === 0
                                  ? lang == 'en'
                                    ? 'A'
                                    : 'א'
                                  : itemAnswer?.index === 1
                                  ? lang == 'en'
                                    ? 'B'
                                    : 'ב'
                                  : itemAnswer?.index === 2
                                  ? lang == 'en'
                                    ? 'C'
                                    : 'ג'
                                  : lang == 'en'
                                  ? 'D'
                                  : 'ד'}
                              </Text>
                            </View>
                            <View style={styles.resultsQuestion1}>
                              <Text
                                style={{
                                  fontSize: RFS(13.5),
                                  textAlign: 'right',

                                  paddingHorizontal: wp(5),
                                  marginBottom: hp(2),
                                  fontFamily: 'Assistant-Regular',
                                  color: isCorrectAnswer
                                    ? '#4CAF34'
                                    : isWrongAnswer
                                    ? 'red'
                                    : 'black',
                                }}>
                                {itemAnswer?.item}
                              </Text>
                            </View>
                          </View>
                        );
                      }}
                    />

                    <TouchableOpacity onPress={() => setIsActive(false)}>
                      <Image
                        style={styles.arrowUpImageStyle}
                        source={require('../../assets/images/arrowUP.png')}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </>
            );
          }}
        />
      </View>
      {/* flatList Here */}
      {/* Buttons */}
      <View style={styles.questionControls}>
        <TouchableOpacity
          style={[styles.questionControlsButton]}
          onPress={async () => {
            setLoader(true);
            const data = {
              examTimeMin: 120,
              totalTimeTakenMin: TTTM,
              avgQuestionTimeTakenMs: averageTimeInMilliseconds,
              correctAnswers: correctAnswers,
              totalQuestions: numQuestions,
              updateTimestamp: 0,
            };
            await onExamSubmit(data);
            onClose();
            setShowPageQuiz(false);
            setTimeout(() => {
              setTriggerPremiumModal(prevNumber => prevNumber + 1);
              closeQuizPageSheet();
            }, 20);
            setLoader(false);
          }}>
          <Text style={styles.nextButtonText}>{t('quiz.exitExam')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.questionControlsButton2Result]}
          onPress={exitQuizTest}>
          <Text style={styles.nextButtonText2}>{t('overAll.repeatQuiz')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Results;
