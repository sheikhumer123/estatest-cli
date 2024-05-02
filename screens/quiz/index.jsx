import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, Button, Dimensions, View} from 'react-native';

import Question from '../../components/Quiz/Question';
import {LoaderContext} from '../../contexts/AppLoading';
import Results from './Results';
import styles from './styles';
import {
  deleteDraft,
  getDraft,
  getQuizQuestions,
  getQuizQuestionsSimple,
  nextQuestionDraft,
  submitDraftAnswers,
  submitQuiz,
} from '../../api/newApisToken';
import ResumeQuizModal from '../../components/ResumeQuizModal/ResumeQuizModal';
import {useSelector} from 'react-redux';

const QuizPage = ({
  navigation,
  closeQuizPageSheet,
  setShowPageQuiz,
  setCheckQuestionLoad,
  setRefreshExamStates,
  setTriggerPremiumModal,
  openQuizModal,
  closeQuestionSheet2,
  closeQuizStartPage,
}) => {
  const ScreenHeight = Dimensions.get('window').height;
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
  const [timerEnable, setTimerEnable] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const answerBottomSheetRef = useRef(null);
  const resultRef = useRef(null);
  const [isSolved, setIsSolved] = useState([0]);
  const [firstTime, setFirstTime] = useState(true);
  const [openResumeModal, setOpenResumeModal] = useState(false);
  const {userDetails, isPremiumUser} = useSelector(state => state.userReducer);

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

  const handleNextQuestionPress = async () => {
    setSelectedAnswerIndex(-1);
    setQuestionIndex(questionIndex + 1);
    const body = {
      uid: userDetails.uid,
      questions: questions,
      givenAnswered: userAnswers,
      questionsIndex: [0],
      remainTime: timeLeft,
    };

    const editDraftBody = {
      givenAnswered: userAnswers,
      questionsIndex: questionIndex,
      uid: userDetails.uid,
    };

    if (!firstTime) {
      await nextQuestionDraft(editDraftBody);
    }
    if (firstTime) {
      await submitDraftAnswers(body);
      setTimerEnable(true);
    }
    setFirstTime(false);
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

  const addMissingIndexes = last => {
    const missing = [];
    for (let i = 0; i <= last; i++) {
      if (!isSolved.includes(i)) {
        missing.push(i);
      }
    }
    if (missing.length > 0) {
      const newIsSolved = [...isSolved, ...missing];
      setIsSolved(newIsSolved);
    }
  };

  const goToDiscard = async () => {
    const draft = await getDraft();
    if (draft) {
      setTimeLeft(draft?.remainTime);
      setFirstTime(false);
      const secondArray2 = draft.givenAnswers;
      setUserAnswers(secondArray2);
      const questions = draft?.questions;
      setQuestions(questions);
      setQuestionIndex(draft.questionsIndex[draft?.questionsIndex?.length - 1]);
      setSelectedAnswerIndex(secondArray2[0]);
      setIsLoading(false);
      addMissingIndexes(
        draft?.questionsIndex[draft?.questionsIndex?.length - 1],
      );
      setTimerEnable(true);
      return;
    }
  };

  const discardDraft = async () => {
    setTimerEnable(true);
    await deleteDraft();
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const draft = await getDraft('0QS0sLNz3JF4gCPvKkHT');
      if (draft) {
        setOpenResumeModal(true);
      }

      const body = {
        uid: userDetails.uid,
      };

      if (isPremiumUser) {
        const questions = await getQuizQuestions(body);
        if (questions == undefined) {
          setLoader(false);
          closeQuestionSheet2();
          return;
        }
        setQuestions(questions);
        setIsLoading(false);
        const initialUserAnswers = Array(questions?.length).fill(-1);
        setUserAnswers(initialUserAnswers);
        answerBottomSheetRef?.current?.present();
        return;
      }
      const questions = await getQuizQuestionsSimple(body);
      if (questions == undefined) {
        setLoader(false);
        closeQuestionSheet2();
        return;
      }
      setQuestions(questions);
      setIsLoading(false);
      const initialUserAnswers = Array(questions?.length).fill(-1);
      setUserAnswers(initialUserAnswers);
      answerBottomSheetRef?.current?.present();
    };
    fetchQuestions();
  }, []);

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
      setShowPageQuiz(false);
      handleResultSheetOpen();
    }
  };

  const handleClose = () => {
    answerBottomSheetRef.current.present();
  };

  const handleSubmitExam = async data => {
    setShowPageQuiz(false);
    await submitQuiz(data)
      .then(async result => {
        if (result) {
          await deleteDraft();
          setRefreshExamStates(prevNumber => prevNumber + 1);
        }
        setTimeout(() => {
          openQuizModal();
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
    if (height) {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 70 - percentageOfHeight;
      let integerValue = parseInt(size);
      setAccurateSize(`${integerValue}%`);
      answerBottomSheetRef.current?.snapToIndex(0);
      answerBottomSheetRef.current?.snapToPosition(`${integerValue}%`);
    }
  }, [height, questionIndex]);

  const renderQuiz = (
    <>
      {questionIndex < questions?.length ? (
        <>
          <Question
            setShowPageQuiz={setShowPageQuiz}
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
            setIsSolved={setIsSolved}
            isSolved={isSolved}
            timerEnable={timerEnable}
          />
          {/* Result Component */}
          <BottomSheetModal
            overDragResistanceFactor={10}
            ref={resultRef}
            index={0}
            snapPoints={resultSnapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{display: 'none'}}
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
            }}>
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
              openQuizModal={openQuizModal}
            />
          </BottomSheetModal>
          <ResumeQuizModal
            visibility={openResumeModal}
            closeModal={() => setOpenResumeModal(false)}
            onCancelSubmitModal={() => {
              discardDraft();
              setOpenResumeModal(false);
            }}
            onConfirmSubmitModal={() => {
              goToDiscard();
              setOpenResumeModal(false);
            }}
          />
        </>
      ) : null}
    </>
  );

  return (
    <View style={styles.root}>
      {!isLoading ? (
        renderQuiz
      ) : (
        <ActivityIndicator size="large" style={{flex: 1}} />
      )}
    </View>
  );
};

export default QuizPage;
