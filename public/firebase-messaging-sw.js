importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDjo-nHZQBHlSkCUdIG7oi3szHHThVilBs",
  authDomain: "reflex-nft.firebaseapp.com",
  projectId: "reflex-nft",
  storageBucket: "reflex-nft.appspot.com",
  messagingSenderId: "73589118978",
  appId: "1:73589118978:web:f5cee2ba0696c11d1b6f1b",
  measurementId: "G-X6CV79Z5WG"
});

const messaging = firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => {
  const { title, body } = JSON.parse(payload.data.notification);
  var options = {
    body,
  };
  console.log('title ==>', title)
  registration.showNotification(title, options);
});

