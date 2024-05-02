import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';
import ExamNavigationBar from '../../screens/quiz/ExamNavigationBar';
import Timer from '../../screens/quiz/Timer';
import styles from '../../screens/quiz/styles';
import BottomSheetCustom from '../BottomSheetCustom/BottomSheetCustom';
import CancelModal from '../CancelModal/CancelModal';
import ExamNavigationBarPractice from '../Practice/ExamNavigationBarPractice';
import SubmissionModal from '../SubmissionModal/SubmissionModal';
import AnswersList from './AnswersList';
import QuestionText from './QuestionText';

const Question = ({
  closeQuizPageSheet,
  questionIndex,
  setQuestionIndex,
  selectedAnswerIndex,
  handleTimeOut,
  questions,
  isCollapsed,
  setIsCollapsed,
  handleAnswerPress,
  handleOpenBottomSheet,
  handlePreviousQuestionPress,
  handleNextQuestionPress,
  hasCompleted,
  bottomSheetModalRef,
  timeLeft,
  setTimeLeft,
  isPractice,
  setModalVisibleFunc,
  submitModalVisible,
  SubmitModalOpenFunc,
  onCancelSubmitModal,
  onConfirmSubmitModal,
  userAnswers,
  setIsSolved,
  isSolved,
  timerEnable,
}) => {
  const [height, setHeight] = useState(0);
  const {t} = useTranslation();
  const bottomSheetRefQuiz = useRef(null);
  const snapPoints = ['85%', '85%', '90%'];
  const [startingSnap, setStartingSnap] = useState('60%');

  const [exitModal, setExitModal] = useState(false);
  const exam1 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part1.pdf';
  const exam2 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part2.pdf';
  const [selected, setSelected] = useState('1');
  const ScreenHeight = Dimensions.get('window').height;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(questionIndex);
  }, [questionIndex]);

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
  };

  const onConfrimFunction = () => {
    setExitModal(false);
    setTimeout(() => {
      closeQuizPageSheet();
    }, 500);
  };

  useEffect(() => {
    if (height && Platform.OS === 'ios') {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 75 - percentageOfHeight;
      let integerValue = parseInt(size);
      bottomSheetRefQuiz.current?.snapToPosition(`${integerValue}%`);
      setTimeout(() => {
        setStartingSnap(integerValue + 0.1);
        bottomSheetRefQuiz.current?.snapToIndex(5);
      }, 500);
    }
  }, [height]);

  useEffect(() => {
    if (height && Platform.OS === 'android') {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 80 - percentageOfHeight;
      let integerValue = parseInt(size);
      setStartingSnap(integerValue);
      bottomSheetRefQuiz.current?.snapToPosition(`${integerValue}%`);
      setTimeout(() => {
        setStartingSnap(integerValue);
        bottomSheetRefQuiz.current?.snapToIndex(5);
      }, 500);
    }
  }, [height]);

  const updateIndex = () => {
    if (questionIndex === questions.length - 1) {
      SubmitModalOpenFunc();
    } else {
      handleNextQuestionPress();
    }
    if (!isSolved.includes(currentIndex)) {
      setIsSolved([...isSolved, questionIndex]);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.questionContainer}>
          {isPractice ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={setModalVisibleFunc}
              style={styles.endOfTest}>
              <Text style={styles.cancelText}>
                {t('overAll.leavingPractice')}
              </Text>
            </TouchableOpacity>
          ) : (
            // closeQuizPageSheet
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setExitModal(true)}
              style={styles.endOfTest}>
              <Text style={styles.cancelText}>{t('overAll.cancel')}</Text>
            </TouchableOpacity>
          )}
          {/* Exam Navigation Bar */}
          {isPractice && (
            <ExamNavigationBarPractice
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              userAnswers={userAnswers}
              selectedAnswerIndex={selectedAnswerIndex}
            />
          )}
          {/* Exam Navigation Bar */}
          {!isPractice && (
            <ExamNavigationBar
              setIsSolved={setIsSolved}
              isSolved={isSolved}
              questions={questions}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              userAnswers={userAnswers}
              selectedAnswerIndex={selectedAnswerIndex}
              handlePreviousQuestionPress={handlePreviousQuestionPress}
            />
          )}
          {/* Timer Practice */}
          {!hasCompleted && isPractice && (
            <Timer
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onTimeOut={handleTimeOut}
              timerEnable={timerEnable}
            />
          )}
          {/* Timer quiz */}
          {!hasCompleted && !isPractice && (
            <Timer
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onTimeOut={handleTimeOut}
              timerEnable={timerEnable}
            />
          )}
          {/* Timer Replace */}
          {hasCompleted && !isPractice && (
            <View style={styles.replace}>
              <Text style={styles.timerText}></Text>
            </View>
          )}
          {/* Question Section */}
          <QuestionText
            question={questions[questionIndex].question}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            onLayout={onLayout}
          />

          {/* Answer section */}

          <BottomSheetCustom
            startingSnap={startingSnap}
            component={
              <AnswersList
                question={questions[questionIndex]}
                selectedAnswerIndex={selectedAnswerIndex}
                handleAnswerPress={handleAnswerPress}
                hasCompleted={hasCompleted}
              />
            }
            reference={bottomSheetRefQuiz}
          />
        </View>
        {/* Bottom Buttons Section Quiz */}
        {!isPractice && (
          <View style={styles.questionControls}>
            <TouchableOpacity
              onPress={updateIndex}
              style={[
                questionIndex == 0
                  ? styles.questionControlsButtonQuizSingle
                  : styles.questionControlsButtonQuiz,
                ,
              ]}>
              <Text style={styles.nextButtonText}>
                {questionIndex === questions.length - 1
                  ? t('quiz.finish')
                  : t('quiz.next')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.legislationBook}
              onPress={handleOpenBottomSheet}>
              <Image
                source={require('../../assets/images/Vector.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
              <Text style={styles.legislationBookLabel}>
                {t('quiz.rulebook')}
              </Text>
            </TouchableOpacity>
            {questionIndex !== 0 && (
              <TouchableOpacity
                onPress={handlePreviousQuestionPress}
                style={[
                  styles.questionControlsButtonQuiz,
                  styles.previousButton,
                ]}>
                <Text style={styles.previousButtonText}>
                  {t('quiz.previous')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* Bottom Buttons Section Practice */}
        {isPractice && (
          <View style={styles.questionControls}>
            <TouchableOpacity
              onPress={updateIndex}
              style={[styles.questionControlsButton]}>
              <Text style={styles.nextButtonText}>
                {questionIndex === questions.length - 1
                  ? t('quiz.finish')
                  : t('quiz.next')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.legislationBook}
              onPress={handleOpenBottomSheet}>
              <Image
                source={require('../../assets/images/Vector.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
              <Text style={styles.legislationBookLabel}>
                {t('overAll.basicConcepts')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.legislationBook}
              onPress={handleOpenBottomSheet}>
              <Image
                source={require('../../assets/images/Vector.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
              <Text style={styles.legislationBookLabel}>
                {t('overAll.laws')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <CancelModal
          modalVisible={exitModal}
          // setModalVisible={() => setExitModal(false)}
          onCancel={() => setExitModal(false)}
          onConfirm={onConfrimFunction}
        />
        <SubmissionModal
          bottomSheetModalRef={bottomSheetModalRef}
          submitModalVisible={submitModalVisible}
          setSubmitModalVisible={SubmitModalOpenFunc}
          onCancelSubmitModal={onCancelSubmitModal}
          onConfirmSubmitModal={onConfirmSubmitModal}
        />
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enableContentPanningGesture={false}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          style={{paddingHorizontal: 5}}
          handleIndicatorStyle={{
            backgroundColor: '#96CAFF',
            width: '10%',
            marginVertical: 10,
          }}>
          {Platform.OS === 'ios' ? (
            <WebView
              style={{flex: 1}}
              nestedScrollEnabled={true}
              source={{
                uri: selected === '1' ? exam1 : exam2,
              }}
            />
          ) : (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{flex: 1, marginTop: 20}}>
              <Pdf
                trustAllCerts={false}
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                }}
                source={{
                  uri: selected == 1 ? exam1 : exam2,
                }}
                onLoadComplete={(numberOfPages, filePath) => {}}
                onPageChanged={(page, numberOfPages) => {}}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
            </ScrollView>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default Question;
