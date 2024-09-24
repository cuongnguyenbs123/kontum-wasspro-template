// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (firebase.messaging.isSupported()) {
    var firebaseConfig = {
        apiKey: "AIzaSyAb7rVC1a2QoMkIj5p7H7pZEJNiSi4MGjI",
        authDomain: "cskh-wasspro.firebaseapp.com",
        projectId: "cskh-wasspro",
        storageBucket: "cskh-wasspro.appspot.com",
        messagingSenderId: "64899498084",
        appId: "1:64899498084:web:f809364c226eea7d7ddf71",
        measurementId: "G-K5ZPYD6LPX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.requestPermission().then(function () {
        //console.log('Notification permission granted.');
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify. ', err);
    });

    messaging.getToken({ vapidKey: 'BHddZoNXeVIeQkAbcm4jQXszRhjvmBcPmZ0bJVUgdnjIa1qd15gpStTJ68FPC1JzFJaM7Zm8FnbXZg5GLm5nSJ8' }).then(function (currentToken) {
        if (currentToken) {
            //console.log('currentToken', currentToken);
            VNPT.Common.Post(SaveBrowserToken, JSON.stringify({ Token: currentToken }), function (result) {                
                if (result.Code != 200)
                    console.log(result.Message);
            });
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
    });

    // [START messaging_on_foreground_message]
    messaging.onMessage(function (payload) {
        //console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
        VNPT.Common.Notify(payload.notification.body, "success");
    });
} else {
    console.log("Browser don't support firebase :(")
}