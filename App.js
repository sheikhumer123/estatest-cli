import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {LogBox, Text, TextInput, View, AppState, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Main from './Main.jsx';
import AppLoading from './contexts/AppLoading';
import {AuthProvider} from './contexts/AuthContext';
import {LanguageProvider} from './contexts/LanguageContext';
import i18n from './i18n';

import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {MainProvider} from './contexts/MainContext';
import {PermissionsAndroid} from 'react-native';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import ContactForm from './screens/contact-details/index.jsx';
const initI18n = i18n;
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '285876470073-5l5a01vkeu8ru52h066ivsdom2c1s84j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

export default function App() {
  const {lang} = useSelector(state => state.userReducer);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  const onDisplayNotification = async () => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'remainder',
        name: 'Remainder',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      if (lang == 'he') {
        await notifee.displayNotification({
          title: 'Estatest',
          body: '<p dir="rtl">זמן תיווך! הגיע הזמן להמשיך לתרגל!</p>',
          ios: {
            sound: 'default',
            critical: true,
            foregroundPresentationOptions: {
              sound: true,
            },
          },
          android: {
            importance: AndroidImportance.HIGH,
            channelId,
            pressAction: {
              id: 'default',
            },
            alarmManager: {
              allowWhileIdle: true,
            },
          },
        });
      } else {
        await notifee.displayNotification({
          title: 'Estatest Prepration Reminder',
          body: `It's time to Prepare yourself to do the Practice!`,
          ios: {
            sound: 'default',
            critical: true,
            foregroundPresentationOptions: {
              sound: true,
            },
          },
          android: {
            importance: AndroidImportance.HIGH,
            channelId,
            pressAction: {
              id: 'default',
            },
            alarmManager: {
              allowWhileIdle: true,
            },
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  messaging().requestPermission();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      hideNavigationBar();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS == 'android') {
      const subscription = AppState.addEventListener('blur', nextAppState => {
        hideNavigationBar();
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (Platform.OS == 'android') {
      const subscription = AppState.addEventListener('focus', nextAppState => {
        hideNavigationBar();
      });
      return () => {
        subscription.remove();
      };
    }
  }, []);

  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <LanguageProvider>
          <AppLoading>
            <AuthProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                  <NavigationContainer>
                    <MainProvider>
                      <Main />
                    </MainProvider>
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </AuthProvider>
          </AppLoading>
        </LanguageProvider>
      </View>
    </SafeAreaProvider>
  );
}
