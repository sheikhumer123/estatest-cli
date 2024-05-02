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

function PremiumAcceptModal(props) {
  const {label, modalVisible, setModalVisible, onCancel, onConfirm} = props;
  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.upperPart}>
            <Text style={styles.faceIDText}>{t('overAll.premiumAText')} ?</Text>
          </View>
          <View style={styles.lowerPart}>
            <TouchableOpacity onPress={onCancel} activeOpacity={0.5}>
              <Text style={styles.cancelText}>{t('overAll.cancelation')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={onConfirm} activeOpacity={0.5}>
              <Text style={styles.confirmText}>
                {t('overAll.confirmation')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default PremiumAcceptModal;
