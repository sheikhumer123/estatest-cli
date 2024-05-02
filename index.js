/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useSelector} from 'react-redux';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const onDisplayNotification = async () => {
  const {lang} = useSelector(state => state.userReducer);
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
        ios: {
          sound: 'default',
          critical: true,
          foregroundPresentationOptions: {
            sound: true,
          },
        },
      });
    } else {
      await notifee.displayNotification({
        title: 'EstaTest Prepration Reminder',
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

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User Dismissed notification');
      await notifee.cancelNotification(detail.notification.id);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      break;
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  onDisplayNotification();
});

messaging().onMessage(async remoteMessage => {
  onDisplayNotification();
});

const finalApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => finalApp);
