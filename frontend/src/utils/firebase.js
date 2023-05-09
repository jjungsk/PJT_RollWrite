import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage} from 'firebase/messaging';
import { FIREBASE_CONFIG } from "../constants/firebaseConfig";

initializeApp(FIREBASE_CONFIG);

const messaging = getMessaging();

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });

    if (currentToken) {
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
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
