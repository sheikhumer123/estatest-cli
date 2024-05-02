import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Home from '../screens/home';
import Login from '../screens/login';
import Reminders from '../screens/reminders';
import Resources from '../screens/resources';
import Settings from '../screens/settings';
import AuthStack from './authStack';
const Stack = createStackNavigator();

const MainStack = props => {
  const {t} = useTranslation();
  const {isTutorial, lang} = useSelector(state => state.userReducer);
  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    if (lang == 'en') {
      setDirection('horizontal');
    } else if (lang == 'he') {
      setDirection('horizontal-inverted');
    }
    console.log(direction);
  }, [lang]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: direction,
      }}
      initialRouteName="Home">
      <Stack.Screen
        options={{gestureEnabled: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Reminders"
        component={Reminders}
        options={{title: t('pages.reminders')}}
      />
      <Stack.Screen
        name="Resources"
        component={Resources}
        options={{title: t('pages.resources')}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: t('pages.settings')}}
      />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
