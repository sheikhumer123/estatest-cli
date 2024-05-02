import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import styles from "../../screens/quiz/styles";

const ExamNavigationBarPractice = ({
  questionIndex,
  setQuestionIndex,
  userAnswers,
}) => {
  const { width } = Dimensions.get("window");
  const questionNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const scrollViewRef = useRef();
  const bubbleWidth = 60;
  const ITEM_HEIGHT = 55;
  const flatListRef = useRef(null);
  // const currentIndex = questionIndex;
  useEffect(() => {
    const scrollToIndex = (index) => {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    };
    scrollToIndex(questionIndex);
  }, [questionIndex]);

  return (
    <View>
      {/* Margin */}
      <View style={styles.navigationContainerDistance} />
      {/* Bubbles Container */}
      <FlatList
        inverted
        ref={flatListRef}
        data={questionNumbers}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item}
        getItemLayout={(questionNumbers, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          console.warn("Scroll to index failed:", info);
        }}
        renderItem={({ item, index }) => {
          const isAnswered = userAnswers[index] !== -1 ? true : false;
          const isSelected = index === questionIndex;
          const bubbleStyle = isSelected
            ? styles.activeBubble
            : [
                styles.bubble,
                {
                  backgroundColor:
                    index < questionIndex && isAnswered === false
                      ? "#2196F3"
                      : "#d4d4d4",
                },
              ];
          const textStyle = isSelected ? styles.activeText : styles.text;
          return (
            <View style={styles.bubbleContainer}>
              {/* "#d4d4d4" "#FFBC57" */}
              <View
                key={item}
                style={bubbleStyle}
                // onPress={() => setQuestionIndex(index)}
              >
                <Text style={textStyle}>{item}</Text>
              </View>
              <View
                style={[
                  styles.line,
                  { backgroundColor: isSelected ? "#2196F3" : "#d4d4d4" },
                ]}
              />
              {index < questionIndex && isAnswered === true ? (
                <View
                  // onPress={() => setQuestionIndex(index)}
                  style={styles.tickContainer}
                >
                  <Image
                    source={require("../../assets/images/tickB.png")}
                    resizeMode="contain"
                    style={styles.tickImage}
                  />
                </View>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ExamNavigationBarPractice;
