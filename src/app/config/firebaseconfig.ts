export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyABv4ISAG3BFqMct05jaR7mw1eCQINHarI",
    authDomain: "ionic-project-c8789.firebaseapp.com",
    databaseURL: "https://ionic-project-c8789.firebaseio.com",
    projectId: "ionic-project-c8789",
    storageBucket: "ionic-project-c8789.appspot.com",
    messagingSenderId: "15537356806",
    appId: "1:15537356806:web:bd4a1d4b005babb0390387",
    measurementId: "G-DPB2ELR5EV"
};

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};