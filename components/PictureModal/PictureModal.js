import React from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';

function PictureModal(props) {
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
            <Text style={styles.faceIDText}>{t('overAll.picturetitle')}!</Text>
            <Text style={styles.faceIDText2}>{t('overAll.pictureDec')}</Text>
          </View>
          <View style={styles.lowerPart}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onCancel}
              activeOpacity={0.5}>
              <Text style={[styles.confirmText, {color: 'red'}]}>
                {t('overAll.pictureBtnClose')}
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
                {t('overAll.pictueBtnConfirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default PictureModal;
