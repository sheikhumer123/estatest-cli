import React, {useContext, useState} from 'react';
// import * as AppleAuthentication from "expo-apple-authentication";
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoaderContext} from '../../contexts/AppLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputs from '../../components/TextInputs/TextInputs';
import Buttons from '../../components/Buttons/Buttons';
import auth from '@react-native-firebase/auth';
import {hp} from '../../dimensions/dimensions';

export default function ForgotPassword({navigation}) {
  const {t} = useTranslation();
  // const { signInWithApple } = useAuth();
  const {setLoader} = useContext(LoaderContext);
  // Authentication: User creation.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const forgotFunction = () => {
    if (email === '') {
      Alert.alert(`${t('overAll.intoProblem')}`, `${t('overAll.enterEmail')}`);
      return;
    }
    setLoader(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoader(false);
        Alert.alert(`${t('overAll.intoProblem')}`, `${t('overAll.emailSent')}`);
        navigation.goBack();
      })
      .catch(error => {
        setLoader(false);
        const errorCode = error.code;
        console.log(
          '🚀 ~ file: index.jsx:35 ~ forgotFunction ~ errorCode:',
          errorCode,
        );
        const errorMessage = error.message;
        console.log(
          '🚀 ~ file: index.jsx:37 ~ forgotFunction ~ errorMessage:',
          errorMessage,
        );
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignSelf: 'flex-end', marginTop: hp(2)}}>
            <AntDesign name="arrowright" size={26} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.txtConnect}>{t('overAll.forgotPassword')}</Text>
          <TextInputs
            value={email}
            simpleTxtInput
            placeholder={t('overAll.forgotEmail')}
            onChangeText={text => setEmail(text)}
          />
          {/* <TextInputs
            value={password}
            simpleTxtInput
            placeholder={t("overAll.password")}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <TextInputs
            value={confirmPassword}
            simpleTxtInput
            placeholder={t("overAll.confirmPassword")}
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          /> */}

          <Buttons
            mediumBtn
            innerTxt={t('overAll.sendReset')}
            marginTop={'7%'}
            onPress={forgotFunction}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
