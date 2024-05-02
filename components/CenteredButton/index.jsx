import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default CenteredButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
