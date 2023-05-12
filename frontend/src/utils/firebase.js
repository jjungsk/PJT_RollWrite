import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage} from 'firebase/messaging';
import { FIREBASE_CONFIG } from "../constants/firebaseConfig";

const detectIphoneDevice = (agent) => {
  const iPhoneRegex = /iPhone|iPod|Mac OS X/i;
  return iPhoneRegex.test(agent);
};
const isIphone = detectIphoneDevice(window.navigator.userAgent);

var messaging = null;
if (!isIphone) {
  initializeApp(FIREBASE_CONFIG);  
  messaging = getMessaging();
}

export const requestForToken = async () => {
  try {
    if (messaging !== null) {
      const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
  
      if (currentToken) {
        return currentToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }

  return "";
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
