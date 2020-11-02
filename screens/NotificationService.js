
/**
 * Notification Service
 * @ Mi-Xlab Anoop
 */
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import env from "react-native-config";
import { Platform } from "react-native";

class NotificationService {

  constructor() {
    this.configure();

    this.lastId = 0;
    this.timeoutFun = null;
  }

  finishNotificationresult = (notification) => {
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  };
  onNotification = (notification) => {
    console.log("Notification : ", notification);

    if (notification == undefined) return;
    if (notification.userInteraction == true) {
      console.log("Notification Opened:" + JSON.stringify(notification));
    }
    this.finishNotificationresult(notification)
  };
  onRegister(token) {
    console.log("Device Token :", token)
    FCM_Token = token
    // PushNotification.popInitialNotification((notification) => {
    //     if (notification) { this.handleNotification(notification); }
    // });
  }

  configure() {
    PushNotification.configure({
      onRegister: (response) => this.onRegister(response.token),
      onNotification: (notification) => this.onNotification(notification),

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      //senderID: gcm,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }
  cancelNotification() {
    PushNotification.cancelLocalNotifications({ id: "" + this.lastId });
  }



  cancelAllNotifications() {
    if (Platform.OS == "ios") {
      PushNotification.cancelAllLocalNotifications();
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  }
}

export default NotificationService;
