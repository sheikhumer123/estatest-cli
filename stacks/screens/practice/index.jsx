import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import {
  View,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Results from '../quiz/Results';
import Question from '../../components/Quiz/Question';
import styles from './styles';
import {getPracticeQuestions, submitPractice} from '../../api/api';
import {LoaderContext} from '../../contexts/AppLoading';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Dimensions} from 'react-native';
import PracticeQuestion from '../../components/Practice/PracticeQuestion';
// import MainContext from '../../contexts/MainContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
const ScreenHeight = Dimensions.get('window').height;

const QuizPagePractice = ({
  navigation,
  setCheckQuestionLoad,
  closePracticeSheet,
  setRefreshExamStates,
  setTriggerPremiumModal,
  openPracticeModal,
}) => {
  // const {setRefreshExamStates} = useContext(MainContext);
  const resultSnapPoints = ['92%'];
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [questionLength, setQuestionLength] = useState(0);
  const bottomSheetModalRef = useRef(null);
  const answerBottomSheetRef = useRef(null);

  // console.log(questionLength);

  const resultRef = useRef(null);
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current.present();
  };

  const [accurateSize, setAccurateSize] = useState('40%');
  const answerBottomSheetSnapPoints = [
    accurateSize,
    '5%',
    '10%',
    '15%',
    '20%',
    '25%',
    '30%',
    '35%',
    '40%',
    '45%',
    '50%',
    '55%',
    '60%',
    '65%',
    '70%',
    '75%',
    '80%',
    '85%',
    '90%',
    '95%',
    '100%',
  ];
  const [height, setHeight] = useState(0);
  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
  };
  // Heigh adjustments

  useEffect(() => {
    if (height) {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 80 - percentageOfHeight;
      let integerValue = parseInt(size);
      setAccurateSize(`${integerValue}%`);
      answerBottomSheetRef.current?.snapToIndex(0);
      answerBottomSheetRef.current?.snapToPosition(`${integerValue}%`);
    }
  }, [height, questionIndex]);

  const handleModelToOpen = () => {
    setModalVisible(true);
  };
  const handleModelToClose = () => {
    setModalVisible(false);
  };
  const handleSubmitModelToOpen = async () => {
    setLoader(true);
    const totalTimeTakenSec = 7200 - timeLeft;
    const TTTM = totalTimeTakenSec / 60;
    const numQuestions = questionLength;
    const averageTimeInSeconds = totalTimeTakenSec / numQuestions;
    const averageTimeInMilliseconds = averageTimeInSeconds * 1000;
    const correctAnswers = questions.reduce(
      (accumulator, currentValue, index) => {
        if (currentValue.correctAnswer === userAnswers[index]) {
          return accumulator + 1;
        }
        return accumulator;
      },
      0,
    );

    const data = {
      examTimeMin: 120,
      totalTimeTakenMin: TTTM,
      avgQuestionTimeTakenMs: averageTimeInMilliseconds,
      totalCorrectAnswers: correctAnswers,
      totalQuestions: numQuestions,
      updateTimestamp: 0,
    };

    await submitPractice(data)
      .then(async result => {
        // setTriggerPracticeModal(prevNumber => prevNumber + 1);
        setLoader(false);
        openPracticeModal();
        // await AsyncStorage.setItem('isFirstTimePractice', '1');
        closePracticeSheet();
      })
      .catch(e => {
        console.log('🚀 ~ file: index.jsx:186 ~ handleSubmitPractice ~ e:', e);
        setLoader(false);
      });
  };
  const handleBackPress = useCallback(() => {
    if (hasCompleted) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      t('quiz.leaveConfirmation.title'),
      t('quiz.leaveConfirmation.description'),
      [
        {
          text: t('quiz.leaveConfirmation.cancelButton'),
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: t('quiz.leaveConfirmation.exitButton'),
          style: 'destructive',

          onPress: () => navigation.goBack(),
        },
      ],
    );
  }, [navigation, questionIndex]);

  const handleTimeOut = () => {
    setQuestionIndex(questions?.length);
  };

  const handleAnswerPress = answerIndex => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    setSelectedAnswerIndex(answerIndex);
  };
  // Handle Practice next question.
  const [completionIndex, setCompletionIndex] = useState(-1);
  const handleNextQuestionPress = () => {
    if (questionIndex !== completionIndex) {
      setHasCompleted(true);
      setCompletionIndex(completionIndex + 1);
    } else {
      setHasCompleted(false);
      setSelectedAnswerIndex(-1);
      setQuestionIndex(questionIndex + 1);
      setQuestionLength(prevNumber => prevNumber + 1);
      if (questionIndex === questions.length - 1) {
        setHasCompleted(true);
      }
    }
  };

  const handlePreviousQuestionPress = () => {
    if (questionIndex === 0) {
      return;
    }

    setQuestionIndex(questionIndex - 1);
    setSelectedAnswerIndex(userAnswers[questionIndex - 1]);
  };
  // API to get data.
  useEffect(() => {
    const fetchQuestions = async () => {
      // setLoader(true);
      const questions = await getPracticeQuestions();
      if (!questions) {
        setCheckQuestionLoad(false);
      }
      setQuestions(questions);
      setIsLoading(false);
      setUserAnswers(Array(questions?.length).fill(-1));
      // setLoader(false);
      // open answer bottom sheet
      answerBottomSheetRef?.current?.present();
    };

    fetchQuestions();
  }, []);

  // Back button in header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: props => <></>,
      headerRight: props => (
        <Button
          {...props}
          title={questionIndex === questions?.length ? '' : t('pages.back')}
          onPress={() => {
            handleBackPress();
          }}
        />
      ),
    });
  }, [navigation, questions, handleBackPress]);

  // Set previously selected answer when navigating between questions
  useEffect(() => {
    const answerForIndex = userAnswers[questionIndex];
    if (answerForIndex !== -1) return setSelectedAnswerIndex(answerForIndex);
    setSelectedAnswerIndex(-1);
  }, [questionIndex]);
  const onCancel = () => {
    setModalVisible(false);
  };
  const onCancelSubmitModal = () => {
    navigation.goBack();
  };
  const onConfirm = () => {
    navigation.goBack();
  };
  const handleResultSheetOpen = () => {
    resultRef.current.present();
  };
  const handleResultSheetClose = () => {
    setLoader(true);
    setUserAnswers(Array(questions?.length).fill(-1));
    setTimeLeft(7200);
    setQuestionIndex(0);
    setLoader(false);
    resultRef?.current?.close();
  };

  const onConfirmSubmitModal = () => {
    setSubmitModalVisible(false);
    if (resultRef && resultRef.current) {
      console.log('conditions true');
      handleResultSheetOpen();
    }
  };
  const handleClose = () => {
    answerBottomSheetRef?.current?.present();
  };
  // const handleSubmitPractice = async () => {
  //   const totalTimeTakenSec = 7200 - timeLeft;
  //   const TTTM = totalTimeTakenSec / 60;
  //   const numQuestions = questions.length;
  //   const averageTimeInSeconds = totalTimeTakenSec / numQuestions;
  //   const averageTimeInMilliseconds = averageTimeInSeconds * 1000;
  //   const correctAnswers = questions.reduce(
  //     (accumulator, currentValue, index) => {
  //       if (currentValue.correctAnswer === answers[index]) {
  //         return accumulator + 1;
  //       }
  //       return accumulator;
  //     },
  //     0,
  //   );
  //   const data = {
  //     examTimeMin: 120,
  //     totalTimeTakenMin: TTTM,
  //     avgQuestionTimeTakenMs: averageTimeInMilliseconds,
  //     correctAnswers: correctAnswers,
  //     totalQuestions: numQuestions,
  //     updateTimestamp: 0,
  //   };
  //   console.log('entered practice');
  //   setLoader(true);
  //   await submitPractice(data)
  //     .then(result => {
  //       console.log('🚀 ~ file: index.jsx:181 ~ .then ~ result:', result);
  //       setLoader(false);
  //       navigation.navigate('Home');
  //     })
  //     .catch(e => {
  //       console.log('🚀 ~ file: index.jsx:186 ~ handleSubmitPractice ~ e:', e);
  //       setLoader(false);
  //     });
  // };

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeOut();
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, handleTimeOut]);

  const renderQuiz = (
    <>
      {questionIndex < questions?.length ? (
        <>
          <PracticeQuestion
            setTriggerPremiumModal={setTriggerPremiumModal}
            questionLength={questionLength}
            handleSubmitModelToOpen={handleSubmitModelToOpen}
            setQuestionLength={setQuestionLength}
            closePracticeSheet={closePracticeSheet}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            selectedAnswerIndex={selectedAnswerIndex}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            hasCompleted={hasCompleted}
            handleAnswerPress={handleAnswerPress}
            handleOpenBottomSheet={handleOpenBottomSheet}
            handlePreviousQuestionPress={handlePreviousQuestionPress}
            handleNextQuestionPress={handleNextQuestionPress}
            handleTimeOut={handleTimeOut}
            questions={questions}
            userAnswers={userAnswers}
            bottomSheetModalRef={bottomSheetModalRef}
            isPractice={true}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            setModalVisibleFunc={handleModelToOpen}
            ModalCloseFunc={handleModelToClose}
            modalVisible={modalVisible}
            onCancel={onCancel}
            onConfirm={onConfirm}
            answerBottomSheetSnapPoints={answerBottomSheetSnapPoints}
            answerBottomSheetRef={answerBottomSheetRef}
            handleClose={handleClose}
            submitModalVisible={submitModalVisible}
            SubmitModalOpenFunc={handleSubmitModelToOpen}
            onCancelSubmitModal={onCancelSubmitModal}
            onConfirmSubmitModal={onConfirmSubmitModal}
            onLayout={onLayout}
          />
          {/* Result Component */}
          {/* <BottomSheetModalProvider> */}

          {/* <BottomSheetModal
            ref={resultRef}
            index={0}
            snapPoints={resultSnapPoints}
            enablePanDownToClose={true}
            // onDismiss={handleClose}
            style={{
              backgroundColor: '#00000000',
              paddingHorizontal: 5,
              shadowColor: '#00000050',
              shadowOffset: {width: 0, height: -2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 10,
            }}
            backgroundStyle={{
              borderRadius: 30,
            }}
            handleIndicatorStyle={{
              backgroundColor: '#3550DC',
              width: '10%',
            }}>
            <Results
              timeLeft={timeLeft}
              questions={questions}
              answers={userAnswers}
              navigation={navigation}
              setQuestionIndex={setQuestionIndex}
              questionIndex={questionIndex}
              onClose={handleResultSheetClose}
              // onExamSubmit={handleSubmitPractice}
            />
          </BottomSheetModal> */}
          {/* </BottomSheetModalProvider> */}
        </>
      ) : null}
    </>
  );

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../assets/images/houseBg.png')}
        style={styles.bgWrap}
        resizeMode="contain"></ImageBackground>
      {!isLoading ? (
        renderQuiz
      ) : (
        <ActivityIndicator size="large" style={{flex: 1}} />
      )}
    </View>
  );
};

export default QuizPagePractice;
