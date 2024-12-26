import "firebase/messaging";
import firebase from "firebase/app";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {

      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyDjo-nHZQBHlSkCUdIG7oi3szHHThVilBs",
        authDomain: "reflex-nft.firebaseapp.com",
        projectId: "reflex-nft",
        storageBucket: "reflex-nft.appspot.com",
        messagingSenderId: "73589118978",
        appId: "1:73589118978:web:f5cee2ba0696c11d1b6f1b",
        measurementId: "G-X6CV79Z5WG"
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localStorage.getItem("fcm_token");

         // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
        // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey: process.env.NEXT_PUBLIC_NOTIFICATION_KEY_PAIR,
          });

          // Set token in our local storage
          if (fcm_token) {
            localStorage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };