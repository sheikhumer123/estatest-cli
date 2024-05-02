import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';

import PracticeQuestion from '../../components/Practice/PracticeQuestion';
import {LoaderContext} from '../../contexts/AppLoading';
import styles from './styles';
import {
  getPracticeQuestions,
  getPracticeQuestionsSimple,
  submitPractice,
} from '../../api/newApisToken';
import {useSelector} from 'react-redux';

const QuizPagePractice = ({
  navigation,
  setCheckQuestionLoad,
  closePracticeSheet,
  setRefreshExamStates,
  setTriggerPremiumModal,
  openPracticeModal,
  closePracticeSheet2,
}) => {
  const ScreenHeight = Dimensions.get('window').height;
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
  const {userDetails, isPremiumUser} = useSelector(state => state.userReducer);

  const resultRef = useRef(null);
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current.present();
  };

  const [height, setHeight] = useState(0);
  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    console.log(height);
    setHeight(height);
  };

  useEffect(() => {
    if (height) {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 80 - percentageOfHeight;
      let integerValue = parseInt(size);
      setStartingSnap(integerValue);
      setTimeout(() => {
        setStartingSnap(integerValue - 0.2);
        bottomSheetRefQuiz.current?.snapToIndex(0);
      }, 1000);
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
    const averageTimeInSeconds = totalTimeTakenSec / questionLength;
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
      avgQuestionTimeTakenMs: averageTimeInSeconds,
      totalCorrectAnswers: correctAnswers,
      totalQuestions: questionLength,
      updateTimestamp: 0,
      uid: userDetails.uid,
    };

    console.log(data);
    await submitPractice(data)
      .then(async result => {
        setRefreshExamStates(prevNumber => prevNumber + 1);
        setLoader(false);
        openPracticeModal();
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
      if (isPremiumUser) {
        const questions = await getPracticeQuestions();
        if (questions == undefined) {
          console.log('running');
          setLoader(false);
          closePracticeSheet2();
        }
        setQuestions(questions);
        setIsLoading(false);
        setUserAnswers(Array(questions?.length).fill(-1));
        answerBottomSheetRef?.current?.present();
        return;
      }
      const questions = await getPracticeQuestionsSimple();
      if (questions == undefined) {
        console.log('running');
        setLoader(false);
        closePracticeSheet2();
      }
      setQuestions(questions);
      setIsLoading(false);
      setUserAnswers(Array(questions?.length).fill(-1));
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
            answerBottomSheetRef={answerBottomSheetRef}
            handleClose={handleClose}
            submitModalVisible={submitModalVisible}
            SubmitModalOpenFunc={handleSubmitModelToOpen}
            onCancelSubmitModal={onCancelSubmitModal}
            onConfirmSubmitModal={onConfirmSubmitModal}
            onLayout={onLayout}
          />
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
