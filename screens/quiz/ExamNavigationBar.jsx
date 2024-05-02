import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {nextQuestionDraft, submitDraftAnswers} from '../../api/newApisToken';

const ExamNavigationBar = ({
  questionIndex,
  setQuestionIndex,
  userAnswers,
  setIsSolved,
  isSolved,
}) => {
  const FlatListComponent =
    Platform.OS === 'android'
      ? require('react-native-gesture-handler').FlatList
      : require('react-native').FlatList;

  const questionNumbers = Array.from({length: 25}, (_, i) => i + 1);

  const ITEM_HEIGHT = 55;
  const flatListRef = useRef(null);

  useEffect(() => {
    const scrollToIndex = index => {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    };
    scrollToIndex(questionIndex);
  }, [questionIndex]);

  const addMissingIndexes = (last, isSolved, setIsSolved) => {
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

  const updateQuestionsBar = async index => {
    setQuestionIndex(index);
    if (!isSolved.includes(index)) {
      setIsSolved([...isSolved, index]);
    }
    const editDraftBody = {
      givenAnswered: userAnswers,
      questionsIndex: index,
      uid: '0QS0sLNz3JF4gCPvKkHT',
    };

    console.log(editDraftBody);

    await nextQuestionDraft(editDraftBody);
  };

  useEffect(() => {
    const getLast = () => {
      const last = isSolved[isSolved?.length - 1];
      addMissingIndexes(last, isSolved, setIsSolved);
    };
    getLast();
  }, [isSolved]);

  return (
    <View>
      {/* Margin */}
      <View style={styles.navigationContainerDistance} />
      {/* Bubbles Container */}
      <FlatListComponent
        inverted
        ref={flatListRef}
        data={questionNumbers}
        showsHorizontalScrollIndicator={false}
        horizontal
        initialScrollIndex={isSolved.length > 4 ? isSolved?.length - 1 : 0}
        keyExtractor={item => item}
        getItemLayout={(questionNumbers, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          console.warn('Scroll to index failed:', info);
        }}
        renderItem={({item, index}) => {
          const isAnswered = userAnswers[index] !== -1 ? true : false;
          const isSelected = index === questionIndex;
          const bubbleStyle = isSelected
            ? styles.activeBubble
            : [
                styles.bubble,
                {
                  backgroundColor: isAnswered
                    ? '#d4d4d4'
                    : isSolved.includes(index)
                    ? '#FFBC57'
                    : '#d4d4d4',
                },
              ];
          const textStyle = isSelected ? styles.activeText : styles.text;
          return (
            <View style={styles.bubbleContainer}>
              <TouchableOpacity
                key={item}
                style={bubbleStyle}
                onPress={() => updateQuestionsBar(index)}>
                <Text style={textStyle}>{item}</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.line,
                  {backgroundColor: isSelected ? '#2196F3' : '#d4d4d4'},
                ]}
              />
              {isSelected ? (
                ''
              ) : isAnswered === true ? (
                <TouchableOpacity
                  onPress={() => setQuestionIndex(index)}
                  style={styles.tickContainer}>
                  <Image
                    source={require('../../assets/images/tickB.png')}
                    resizeMode="contain"
                    style={styles.tickImage}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ExamNavigationBar;
