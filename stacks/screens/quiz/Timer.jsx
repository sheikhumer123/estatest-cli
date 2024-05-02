import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Timer = ({ onTimeOut, timeLeft, setTimeLeft }) => {
  // const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut();
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeOut]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        0
        {Math.floor(timeLeft / 3600)}:
        {Math.floor((timeLeft % 3600) / 60) < 10
          ? `0${Math.floor((timeLeft % 3600) / 60)}`
          : Math.floor((timeLeft % 3600) / 60)}
        :{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </Text>
    </View>
  );
};

export default Timer;
