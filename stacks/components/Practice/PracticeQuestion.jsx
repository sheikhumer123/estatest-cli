import React, {useCallback, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import QuestionText from '../Quiz/QuestionText';
import AnswersList from '../Quiz/AnswersList';
import styles from '../../screens/quiz/styles';
import CancelModal from '../CancelModal/CancelModal';
import SubmissionModal from '../SubmissionModal/SubmissionModal';
import {useState} from 'react';
import WebView from 'react-native-webview';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import {normalizeUnits} from 'moment';
import BottomSheetCustom from '../BottomSheetCustom/BottomSheetCustom';
import ExamNavigationBar from '../../screens/quiz/ExamNavigationBar';

const PracticeQuestion = ({
  handleSubmitModelToOpen,
  questionLength,
  closePracticeSheet,
  questionIndex,
  setQuestionIndex,
  selectedAnswerIndex,
  questions,
  isCollapsed,
  setIsCollapsed,
  handleAnswerPress,
  handleOpenBottomSheet,
  handleNextQuestionPress,
  hasCompleted,
  bottomSheetModalRef,
  isPractice,
  // setModalVisibleFunc,
  modalVisible,
  ModalCloseFunc,
  onCancel,
  onConfirm,
  setQuestionLength,
  // answerBottomSheetRef,
  // handleClose,
  submitModalVisible,
  SubmitModalOpenFunc,
  onCancelSubmitModal,
  onConfirmSubmitModal,
  // answerBottomSheetSnapPoints,
  setTriggerPremiumModal,
  userAnswers,
}) => {
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };
  // const navigation = useNavigation();
  const {t} = useTranslation();
  // const exam1 = "https://www.google.com";
  // const exam2 = "https://www.youtube.com";
  const exam1 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part1.pdf';
  const exam2 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part2.pdf';
  const [selected, setSelected] = useState('1');
  const [height, setHeight] = useState(0);
  const [startingSnap, setStartingSnap] = useState('50%');
  const snapPoints = useMemo(() => ['89']);
  const bottomSheetRefPractice = useRef(null);
  const ScreenHeight = Dimensions.get('window').height;
  const [isSolved, setIsSolved] = useState([0]);

  // bottomSheetRefPractice.current.present();

  const cancelPractice = () => {
    if (questionLength == 0) {
      closePracticeSheet();
      return;
    }
    handleSubmitModelToOpen();
    closePracticeSheet();
  };

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
  };

  useEffect(() => {
    if (height) {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 80 - percentageOfHeight;
      let integerValue = parseInt(size);
      setStartingSnap(`${integerValue}%`);
    }
  }, [height]);

  const AnswerComponent = () => {
    return (
      <>
        <AnswersList
          question={questions[questionIndex]}
          selectedAnswerIndex={selectedAnswerIndex}
          handleAnswerPress={handleAnswerPress}
          hasCompleted={hasCompleted}
        />
      </>
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.questionContainer}>
        {/* Cancel Component */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={cancelPractice}
          style={styles.endOfTest}>
          <Text style={styles.cancelText}>{t('overAll.leavingPractice')}</Text>
        </TouchableOpacity>
        {/* MarginTop */}
        <View style={styles.topMargin} />
        {/* Question Section */}
        <View>
          <QuestionText
            question={questions[questionIndex].question}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            onLayout={onLayout}
          />
        </View>
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
          reference={bottomSheetRefPractice}
        />
      </View>
      {/* Bottom Buttons Section Practice */}
      {isPractice && (
        <View style={styles.questionControls}>
          <TouchableOpacity
            onPress={
              questionIndex === questions.length - 1
                ? SubmitModalOpenFunc
                : handleNextQuestionPress
            }
            style={[styles.questionControlsButtonQuiz]}>
            <Text style={styles.nextButtonText}>
              {questionIndex === questions.length - 1
                ? t('quiz.finish')
                : t('quiz.next')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legislationBook}
            onPress={() => {
              setSelected('1');
              handleOpenBottomSheet();
            }}>
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
            onPress={() => {
              setSelected('2');
              handleOpenBottomSheet();
            }}>
            <Image
              source={require('../../assets/images/Vector.png')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <Text style={styles.legislationBookLabel}>{t('overAll.laws')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Open Rules Bottom Sheet Modal, need to work on it. */}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
            borderRadius: 30,
          }}>
          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <WebView
            style={{flex: 1}}
            onLoad={() => hideLoader()}
            nestedScrollEnabled={true}
            source={{
              uri: selected == 1 ? exam1 : exam2,
            }}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
      {/* Cancel Modal */}
      <CancelModal
        modalVisible={modalVisible}
        setModalVisible={ModalCloseFunc}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      {/* Submit Modal */}
      <SubmissionModal
        submitModalVisible={submitModalVisible}
        setSubmitModalVisible={SubmitModalOpenFunc}
        onCancelSubmitModal={onCancelSubmitModal}
        onConfirmSubmitModal={onConfirmSubmitModal}
      />
    </View>
  );
};

export default PracticeQuestion;
