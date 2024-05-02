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

function SubmissionModal(props) {
  const {
    label,
    submitModalVisible,
    setSubmitModalVisible,
    onCancelSubmitModal,
    onConfirmSubmitModal,
  } = props;
  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={submitModalVisible}
      onRequestClose={() => {
        // alert('')
        // Alert.alert("Modal has been closed.");
        onCancelSubmitModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.upperPart}>
            <Text style={styles.faceIDTextTop}>
              {t('overAll.submitTheTest')}
            </Text>
            <Text style={styles.faceIDText}>{t('overAll.wannaTest')}</Text>
          </View>
          <View style={styles.lowerPart}>
            <TouchableOpacity
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
              onPress={onCancelSubmitModal}
              activeOpacity={0.5}>
              <Text style={styles.cancelText}>{t('overAll.cancelation')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
              onPress={onConfirmSubmitModal}
              activeOpacity={0.5}>
              <Text style={styles.confirmText}>{t('overAll.submit')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default SubmissionModal;
