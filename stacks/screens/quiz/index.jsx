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
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Results from './Results';
import Question from '../../components/Quiz/Question';
import styles from './styles';
import {getQuizQuestions} from '../../api/api';
import {LoaderContext} from '../../contexts/AppLoading';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  dispatchIsPremiumUser,
  dispatchUserDetails,
  dispatchPracticeStates,
  dispatchQuizStates,
} from '../../redux/actions';
// import MainContext from '../../contexts/MainContext';
import {useDispatch} from 'react-redux';
import {submitQuiz} from '../../../api/newApisToken';
const ScreenHeight = Dimensions.get('window').height;

const QuizPage = ({
  navigation,
  closeQuizPageSheet,
  setShowPageQuiz,
  setCheckQuestionLoad,
  setRefreshExamStates,
  setTriggerPremiumModal,
}) => {
  // const {setRefeshExamStates} = useContext(MainContext);
  const resultSnapPoints = ['95%'];
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

  const bottomSheetModalRef = useRef(null);
  const answerBottomSheetRef = useRef(null);
  const resultRef = useRef(null);

  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current.present();
  };

  const handleModelToOpen = () => {
    setModalVisible(true);
  };
  const handleModelToClose = () => {
    setModalVisible(false);
  };
  const handleSubmitModelToOpen = () => {
    setSubmitModalVisible(true);
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

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  const handleNextQuestionPress = () => {
    setSelectedAnswerIndex(-1);
    setQuestionIndex(questionIndex + 1);

    if (questionIndex === questions?.length - 1) {
      setHasCompleted(true);
    }
  };

  const handlePreviousQuestionPress = () => {
    if (questionIndex === 0) {
      return;
    }
    setQuestionIndex(questionIndex - 1);
    setSelectedAnswerIndex(userAnswers[questionIndex - 1]);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuizQuestions();
      if (!questions) {
        setCheckQuestionLoad(false);
      }
      setQuestions(questions);
      setIsLoading(false);
      setUserAnswers(Array(questions?.length).fill(-1));
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
    setSubmitModalVisible(false);
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
    resultRef.current.close();
  };

  const onConfirmSubmitModal = () => {
    setSubmitModalVisible(false);
    if (resultRef && resultRef.current) {
      console.log('conditions true');
      handleResultSheetOpen();
    }
  };

  const handleClose = () => {
    answerBottomSheetRef.current.present();
  };

  const handleSubmitExam = async data => {
    await submitQuiz(data)
      .then(async result => {
        setRefreshExamStates(prevNumber => prevNumber + 1);
        setTimeout(() => {
          closeQuizPageSheet();
        }, 50);
        console.log('🚀 ~ file: index.jsx:182 ~ .then ~ result:', result);
        setLoader(false);
        await AsyncStorage.setItem('isFirstTimeQuiz', '1');
      })
      .catch(e => {
        console.log('🚀 ~ file: index.jsx:186 ~ handleSubmitExam ~ e:', e);
      });
  };

  // Question bottom sheet referencing to make it responsive as expected.
  const [accurateSize, setAccurateSize] = useState('30%');
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

  useEffect(() => {
    // useCallback(() => {
    if (height) {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 70 - percentageOfHeight;
      let integerValue = parseInt(size);
      setAccurateSize(`${integerValue}%`);
      answerBottomSheetRef.current?.snapToIndex(0);
      answerBottomSheetRef.current?.snapToPosition(`${integerValue}%`);
    }
  }, [height, questionIndex]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (height) {
  //       const percentageOfHeight = (height / ScreenHeight) * 100;
  //       const size = 70 - percentageOfHeight;
  //       let integerValue = parseInt(size);
  //       setAccurateSize(`${integerValue}%`);
  //       answerBottomSheetRef.current?.snapToIndex(0);
  //       answerBottomSheetRef.current?.snapToPosition(`${integerValue}%`);
  //     }
  //   }, [height, questionIndex]),
  // );
  const renderQuiz = (
    <>
      {questionIndex < questions?.length ? (
        <>
          <Question
            closeQuizPageSheet={closeQuizPageSheet}
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
            isPractice={false}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            setModalVisibleFunc={handleModelToOpen}
            ModalCloseFunc={handleModelToClose}
            modalVisible={modalVisible}
            onCancel={onCancel}
            onConfirm={onConfirm}
            answerBottomSheetRef={answerBottomSheetRef}
            answerBottomSheetSnapPoints={answerBottomSheetSnapPoints}
            handleClose={handleClose}
            submitModalVisible={submitModalVisible}
            SubmitModalOpenFunc={handleSubmitModelToOpen}
            onCancelSubmitModal={onCancelSubmitModal}
            onConfirmSubmitModal={onConfirmSubmitModal}
            onLayout={onLayout}
          />
          {/* Result Component */}
          {/* <BottomSheetModalProvider> */}
          <BottomSheetModal
            ref={resultRef}
            index={0}
            snapPoints={resultSnapPoints}
            enablePanDownToClose={true}
            onDismiss={handleSubmitExam}
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
            handleIndicatorStyle={{backgroundColor: '#2E99E9', width: '15%'}}>
            <Results
              setTriggerPremiumModal={setTriggerPremiumModal}
              setShowPageQuiz={setShowPageQuiz}
              closeQuizPageSheet={closeQuizPageSheet}
              timeLeft={timeLeft}
              questions={questions}
              answers={userAnswers}
              navigation={navigation}
              setQuestionIndex={setQuestionIndex}
              questionIndex={questionIndex}
              onClose={handleResultSheetClose}
              onExamSubmit={handleSubmitExam}
            />
          </BottomSheetModal>
          {/* </BottomSheetModalProvider> */}
        </>
      ) : null}
    </>
  );

  return (
    <View style={styles.root}>
      {/* <ImageBackground
        source={require('../../assets/images/houseBg.png')}
        style={styles.bgWrap}
        resizeMode="contain"></ImageBackground> */}
      {!isLoading ? (
        renderQuiz
      ) : (
        <ActivityIndicator size="large" style={{flex: 1}} />
      )}
    </View>
  );
};

export default QuizPage;
