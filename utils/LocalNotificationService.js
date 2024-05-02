import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
class LocalNotificationService {
  configure = (callBack, configured) => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        configured();
      },
      onNotification: function (notification) {
        callBack(notification);
        console.log('[LocalNotificationService] onNotification:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: false,
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = () => {
    console.log('localNotification');
    PushNotification.localNotification({
      /* Android Only Properties */
      message: 'Notification',
      title: 'checjk',
      channelId: 'estatest-id',
    });
  };
  createChannel = userData => {
    PushNotification.createChannel(
      {
        channelId: 'estatest-id', // (required)
        channelName: 'EstaTest', // (required)
        vibrate: true,
        importance: Importance.HIGH,
      },
      created => {
        this.cancelAllLocalNotifications();
        this.scheduleNotification(userData);
      },
    );
  };
  getScheduleDate = async userData => {
    const {reminderTime, reminderSelectedDays, reminderDaysData} = userData;
    const newReminderTime = new Date(reminderTime);
    // Function to check if the current day is selected
    function isDaySelected(day) {
      return reminderSelectedDays.some(
        selectedDay => selectedDay.day === day && selectedDay.isSelectedDay,
      );
    }

    // Function to calculate the next occurrence of the reminder
    function calculateNextReminderDate(currentDate) {
      const selectedDays = reminderDaysData.filter(day =>
        isDaySelected(day.day),
      );
      const sortedSelectedDays = selectedDays.sort((a, b) => a.id - b.id); // Sort selected days by their 'id' to ensure the next day is selected

      for (const selectedDay of sortedSelectedDays) {
        const nextDay = (selectedDay.id + 7 - currentDate.getDay()) % 7;
        if (nextDay === 0) {
          // The current day is a selected day, schedule for today
          return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            newReminderTime.getHours(),
            newReminderTime.getMinutes(),
            newReminderTime.getSeconds(),
          );
        }
      }
      // If no selected day is in the current week, schedule for the next selected day
      const daysUntilNextSelectedDay =
        sortedSelectedDays[0].id - currentDate.getDay();
      const nextSelectedDay = new Date(
        currentDate.getTime() + daysUntilNextSelectedDay * 24 * 60 * 60 * 1000,
      );

      return new Date(
        nextSelectedDay.getFullYear(),
        nextSelectedDay.getMonth(),
        nextSelectedDay.getDate(),
        newReminderTime.getHours(),
        newReminderTime.getMinutes(),
        newReminderTime.getSeconds(),
      );
    }

    const currentDate = new Date();
    const executionDate = calculateNextReminderDate(currentDate);

    return executionDate;
  };
  scheduleNotification = async userData => {
    const executionDate = await this.getScheduleDate(userData);
    const currentTime = new Date();

    // Calculate the time difference between the current time and execution time
    const timeDifference = executionDate - currentTime;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + timeDifference),
      allowWhileIdle: false,
      repeatTime: 1,
      message: `It's time to Prepare yourself to do the Practice!`,
      title: 'EstaTest Preparation Reminder',
      channelId: 'estatest-id',
    });
  };

  iosRequestPermission = () => {
    PushNotificationIOS.requestPermissions();
  };

  iosListnerRemoteNotification = onRemoteNotification => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  };

  iosListnerLocalNotification = onRemoteNotification => {
    PushNotificationIOS.addEventListener(
      'localNotification',
      onRemoteNotification,
    );
  };

  scheduleNotificationIOS = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'daytime',
      fireDate: new Date(Date.now() + 5 * 1000), // in 5 secs
      repeats: true,
      repeatsComponent: {
        hour: true,
        minute: true,
      },
      title: 'EstaTest Prepration Reminder',
      subtitle: "It's time to Prepare yourself to do the Practice!",
    });
  };

  iosgetInitialNotification = async callBack => {
    let value = await PushNotificationIOS.getInitialNotification();
    if (value) {
      callBack(value);
    }
  };

  cancelAllNotificationsIOS = async () => {
    PushNotificationIOS.removeAllPendingNotificationRequests();
  };

  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

async function onDisplayNotification() {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export default new LocalNotificationService();
