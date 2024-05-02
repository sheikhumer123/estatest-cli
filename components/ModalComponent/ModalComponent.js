/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import {Alert, Image, Modal, Text, View} from 'react-native';
import styles from './Style';
import {useTranslation} from 'react-i18next';

function ModalComponent(props) {
  const {label, modalVisible, setModalVisible} = props;
  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert(t('overAll.modalClosed'));
        setModalVisible();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.wrapImgSocial}>
            <Image
              style={styles.innerImg}
              resizeMode="contain"
              source={require('../../assets/images/faceidWhite.png')}
            />
          </View>
          <Text style={styles.faceIDText}>
            {label ? label : t('overAll.faceID')}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
export default ModalComponent;
