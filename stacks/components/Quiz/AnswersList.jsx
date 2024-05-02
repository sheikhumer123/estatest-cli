import React from 'react';
import Answer from './Answer';

const AnswersList = ({
  question,
  selectedAnswerIndex,
  handleAnswerPress,
  hasCompleted,
}) => {
  return question.answers.map((answer, index) => (
    <Answer
      key={index}
      answer={answer}
      index={index}
      hasCompleted={hasCompleted}
      isCorrect={index == question.correctAnswer}
      selectedAnswerIndex={selectedAnswerIndex}
      handleAnswerPress={handleAnswerPress}
    />
  ));
};

export default AnswersList;
