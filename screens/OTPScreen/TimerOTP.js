import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styles from './styles';

const TimerOTP = ({timeLeft, onTimeOut, setTimeLeft}) => {
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut();
    }
    const intervalId = setInterval(async () => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeOut]);

  return (
    <>
      <Text style={styles.timerText}>{timeLeft}</Text>
    </>
  );
};

export default TimerOTP;
