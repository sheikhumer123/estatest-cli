import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import UpdatePassword from '../screens/UpdatePassword';
import ContactForm from '../screens/contact-details';
import ForgotPassword from '../screens/forgotPassword';
import ForgotPasswordCode from '../screens/forgotPasswordCode';
import Login from '../screens/login';
import LoginUser from '../screens/loginUser';
import SignUp from '../screens/signupUser';
import Tutorial from '../screens/tutorial';
import MainStack from './mainStack';
import OTPScreen from '../screens/OTPScreen';
import ResetPasswordScreen from '../screens/RestPasswordScreen';
const Stack = createStackNavigator();

const AuthStack = props => {
  const {t} = useTranslation();
  const {isTutorial, lang} = useSelector(state => state.userReducer);
  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    if (lang == 'en') {
      setDirection('horizontal');
    } else if (lang == 'he') {
      setDirection('horizontal-inverted');
    }
  }, [lang]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: direction,
      }}
      initialRouteName={isTutorial ? 'Tutorial' : 'Login'}>
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LoginUser" component={LoginUser} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      {/* <Stack.Screen name="MainStack" component={MainStack} /> */}
      <Stack.Screen
        name="Contact Details"
        options={{title: t('pages.contactDetails')}}
        component={ContactForm}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
