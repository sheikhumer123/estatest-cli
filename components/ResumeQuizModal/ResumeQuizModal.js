import React from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';

function ResumeQuizModal(props) {
  const {visibility, closeModal, onCancelSubmitModal, onConfirmSubmitModal} =
    props;

  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={visibility}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.upperPart}>
            <Text style={styles.faceIDText}>{t('quiz.quizDesc')}</Text>
            <Text style={styles.faceIDText2}>{t('quiz.wanttoTest')}</Text>
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
              <Text style={styles.cancelText}>{t('quiz.newTest')}</Text>
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
              <Text style={styles.confirmText}>{t('quiz.continueTest')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default ResumeQuizModal;
