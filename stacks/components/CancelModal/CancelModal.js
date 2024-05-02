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

function CancelModal(props) {
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
            <Text style={styles.faceIDText}>{' יציאה מהמבחן'}</Text>
            <Text style={styles.faceIDText2}>{t('overAll.exitTest')}</Text>
          </View>
          <View style={styles.lowerPart}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onConfirm}
              activeOpacity={0.5}>
              <Text style={[styles.confirmText, {color: 'red'}]}>
                {t('overAll.cancelation')}
              </Text>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onConfirm}
              activeOpacity={0.5}>
              <Text style={[styles.confirmText, {color: '#007AFF'}]}>
                {t('overAll.confirmation')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default CancelModal;
