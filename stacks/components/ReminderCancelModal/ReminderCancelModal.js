/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';
import {useTranslation} from 'react-i18next';
import {hp} from '../../dimensions/dimensions';

function ReminderCancelModal(props) {
  const {label, modalVisible, setModalVisible, onCancel, onConfirm} = props;
  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.upperPart}>
            <Text style={styles.faceIDTextTop}>
              {t('overAll.deletingReminder')}
            </Text>
            <Text style={styles.faceIDText}>
              {t('overAll.doYouWantToDeleteReminder')}
            </Text>
          </View>
          <View style={styles.lowerPart}>
            <TouchableOpacity onPress={onCancel} activeOpacity={0.5}>
              <Text style={styles.cancelText}>{t('overAll.cancelation')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={onConfirm} activeOpacity={0.5}>
              <Text style={styles.confirmText}>
                {t('overAll.cancelationRemainder')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default ReminderCancelModal;
