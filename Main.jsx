import notifee, {EventType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import i18n from 'i18next';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StatusBar, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useAuth} from './contexts/AuthContext';
import AuthStack from './stacks/authStack';
import MainStack from './stacks/mainStack';
import {Image} from 'react-native';
import {hp} from './dimensions/dimensions';
import LottieView from 'lottie-react-native';

export default function App() {
  const {user} = useAuth();
  const {lang} = useSelector(state => state.userReducer);
  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const RootStack = createStackNavigator();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
    const setTutorial = async () => {
      let tutorial = await AsyncStorage.getItem('tutorial');
      if (tutorial === null) {
        await AsyncStorage.setItem('tutorial', '1');
      }
    };
    setTutorial();
  });

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User Dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <>
      {loader && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            style={{height: hp(50), width: hp(50)}}
            source={require('./assets/logo.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              setLoader(false);
            }}
          />
        </View>
      )}
      {!loader && (
        <>
          {isLoading && (
            <>
              <StatusBar translucent={true} backgroundColor={'transparent'} />
              <RootStack.Navigator
                initialRouteName={!user ? 'AuthStack' : 'MainStack'}
                screenOptions={{headerShown: false}}>
                <RootStack.Screen name="AuthStack" component={AuthStack} />
                <RootStack.Screen name="MainStack" component={MainStack} />
              </RootStack.Navigator>
            </>
          )}
        </>
      )}
    </>
  );
}
