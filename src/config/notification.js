import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import notifee from '@notifee/react-native'

const requestUserPermission = async () => {
  /**
   * On iOS, messaging permission must be requested by
   * the current application before messages can be
   * received or sent
   */
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  await notifee.requestPermission()
  console.log('Authorization status(authStatus):', authStatus);
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};


export const hanldeNoti = async () => {
  if (requestUserPermission()) {
    console.log('Authorized!');
    await messaging().registerDeviceForRemoteMessages();

    messaging()
      .getToken()
      .then(fcmToken => {
        console.log('FCM Token -> ', fcmToken);
      });
  } else console.log('Not Authorization status:', authStatus);

  /**
   * When a notification from FCM has triggered the application
   * to open from a quit state, this method will return a
   * `RemoteMessage` containing the notification data, or
   * `null` if the app was opened via another method.
   */

  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'getInitialNotification:' +
          'Notification caused app to open from quit state',
        );
        console.log(remoteMessage);
        alert(
          'getInitialNotification: Notification caused app to' +
          ' open from quit state',
        );
      }
    });

  /**
   * When the user presses a notification displayed via FCM,
   * this listener will be called if the app has opened from
   * a background state. See `getInitialNotification` to see
   * how to watch for when a notification opens the app from
   * a quit state.
   */
  messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage) {
      console.log(
        'onNotificationOpenedApp: ' +
        'Notification caused app to open from background state',
      );
      console.log(remoteMessage);
      alert(
        'onNotificationOpenedApp: Notification caused app to' +
        ' open from background state',
      );
    }
  });

  /**
   * Set a message handler function which is called when
   * the app is in the background or terminated. In Android,
   * a headless task is created, allowing you to access the
   * React Native environment to perform tasks such as updating
   * local storage, or sending a network request.
   */
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  /**
   * When any FCM payload is received, the listener callback
   * is called with a `RemoteMessage`. Returns an unsubscribe
   * function to stop listening for new messages.
   */
  const unsubscribe = messaging().onMessage(
    async remoteMessage => {
      alert('A new FCM message arrived!');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
    }
  );

  /**
   * Apps can subscribe to a topic, which allows the FCM
   * server to send targeted messages to only those devices
   * subscribed to that topic.
   */
  //   messaging()
  //     .subscribeToTopic(TOPIC)
  //     .then(() => {
  //       console.log(`Topic: ${TOPIC} Suscribed`);
  //     });

  return () => {
    unsubscribe;
    /**
     * Unsubscribe the device from a topic.
     */
    // messaging().unsubscribeFromTopic(TOPIC);
  };
};
