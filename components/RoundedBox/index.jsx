import * as React from 'react';
import {View} from 'react-native';
import styles from './styles';

function RoundedBox({children, isPremiumUser}) {
  return (
    <View
      style={[styles.root, {borderColor: isPremiumUser ? '#E1F1FF' : '#E1F1FF'}]}>
      {children}
    </View>
  );
}

export default RoundedBox;
