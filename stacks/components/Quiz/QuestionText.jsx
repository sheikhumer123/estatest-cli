import React, { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useTranslation } from "react-i18next";
import styles from "../../screens/quiz/styles";

const QuestionText = ({ question, isCollapsed, setIsCollapsed, onLayout }) => {
  const { t } = useTranslation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View onLayout={onLayout}>
      <Text style={styles.questionText}>
        {question}
      </Text>
    </View>
  );
};

export default QuestionText;
