/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

const config =  {
    apiKey: "AIzaSyBdVfzVYQAjLuiggA0ABVqBx1Kem0Uses4",
    authDomain: "rollwrite-1c979.firebaseapp.com",
    projectId: "rollwrite-1c979",
    storageBucket: "rollwrite-1c979.appspot.com",
    messagingSenderId: "1078331877928",
    appId: "1:1078331877928:web:18fd7af7b4b0e90367631d",
    measurementId: "G-95KFB7ZPTY",
};
firebase.initializeApp(config);
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = '[RollWrite] '+payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/logo192.png',
      data: {
        url: 'https://rollwrite.co.kr'
      }
    };
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  // 사용자가 알림을 클릭했을 때 실행될 핸들러 등록
  this.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
});
  