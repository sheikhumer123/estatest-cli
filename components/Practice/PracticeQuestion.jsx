import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
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
import styles from '../../screens/quiz/styles';
import BottomSheetCustom from '../BottomSheetCustom/BottomSheetCustom';
import CancelModal from '../CancelModal/CancelModal';
import AnswersList from '../Quiz/AnswersList';
import QuestionText from '../Quiz/QuestionText';
import SubmissionModal from '../SubmissionModal/SubmissionModal';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {AppState} from 'react-native';

const PracticeQuestion = ({
  handleSubmitModelToOpen,
  questionLength,
  closePracticeSheet,
  questionIndex,
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
  modalVisible,
  ModalCloseFunc,
  onCancel,
  onConfirm,
  submitModalVisible,
  SubmitModalOpenFunc,
  onCancelSubmitModal,
  onConfirmSubmitModal,
}) => {
  const {t} = useTranslation();
  const exam1 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part1.pdf';
  const exam2 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part2.pdf';
  const [selected, setSelected] = useState('1');
  const [height, setHeight] = useState(0);
  const [startingSnap, setStartingSnap] = useState('60%');
  const snapPoints = ['89'];
  const bottomSheetRefPractice = useRef(null);
  const ScreenHeight = Dimensions.get('window').height;
  const [quesContainerHeight, setQuesContainerHeight] = useState(0);

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
  const onLayoutQuestionContainer = event => {
    const {height} = event.nativeEvent.layout;
    const newHeight = height / 2;
    setQuesContainerHeight(newHeight);
  };

  useEffect(() => {
    hideNavigationBar();
    if (height && Platform.OS === 'ios') {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 90 - percentageOfHeight;
      let integerValue = parseInt(size);
      if (height > quesContainerHeight && quesContainerHeight) {
        bottomSheetRefPractice.current?.snapToPosition(`${30}%`);
        setTimeout(() => {
          setStartingSnap(30);
          bottomSheetRefPractice.current?.snapToIndex(5);
        }, 500);
      } else {
        bottomSheetRefPractice.current?.snapToPosition(`${integerValue}%`);
        setTimeout(() => {
          setStartingSnap(integerValue + 0.1);
          bottomSheetRefPractice.current?.snapToIndex(5);
        }, 500);
      }
    }
  }, [height]);

  useEffect(() => {
    hideNavigationBar();
    if (height && Platform.OS === 'android') {
      const percentageOfHeight = (height / ScreenHeight) * 100;
      const size = 90 - percentageOfHeight;
      let integerValue = parseInt(size);
      setStartingSnap(integerValue);
      bottomSheetRefPractice.current?.snapToPosition(`${integerValue}%`);
      setTimeout(() => {
        setStartingSnap(integerValue);
        bottomSheetRefPractice.current?.snapToIndex(5);
      }, 500);
    }
  }, [height]);

  const [isLoading, setIsLoading] = useState(true);

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View
          onLayout={onLayoutQuestionContainer}
          style={styles.questionContainer}>
          {/* Cancel Component */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={cancelPractice}
            style={styles.endOfTest}>
            <Text style={styles.cancelText}>
              {t('overAll.leavingPractice')}
            </Text>
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
                setSelected('2');
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
                setSelected('1');
                handleOpenBottomSheet();
              }}>
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
        {/* Open Rules Bottom Sheet Modal, need to work on it. */}

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
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={{
            backgroundColor: '#00000000',
            paddingHorizontal: 5,
            shadowColor: '#00000050',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 10,
          }}
          enableContentPanningGesture={false}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
            borderRadius: 30,
          }}
          handleIndicatorStyle={{
            backgroundColor: '#96CAFF',
            width: '10%',
            marginVertical: 10,
          }}>
          {isLoading && Platform.OS == 'ios' && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {Platform.OS === 'ios' ? (
            <WebView
              style={{flex: 1}}
              onLoad={() => hideLoader()}
              nestedScrollEnabled={true}
              source={{
                uri: selected == 1 ? exam1 : exam2,
              }}
            />
          ) : (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{flex: 1}}>
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

export default PracticeQuestion;
