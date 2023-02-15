// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvKs8-hc0Utp953U6-45S384LcED2SJEs",
    authDomain: "crwn-clothing-v2-16d1f.firebaseapp.com",
    projectId: "crwn-clothing-v2-16d1f",
    storageBucket: "crwn-clothing-v2-16d1f.appspot.com",
    messagingSenderId: "93084494948",
    appId: "1:93084494948:web:9429725446b38fbb46c371",
    measurementId: "G-QW2YB2X12L"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // Google Auth provider is a class we get from firebase authentication, so "new" keyword is used

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Firestore database intitialization

export const db = getFirestore();

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const batch = writeBatch(db);
//     const collectionRef = collection(db, collectionKey);
   

//     objectsToAdd.forEach((object) => {
//         const docRef = doc(collectionRef, object.title.toLowerCase());
//         batch.set(docRef, object);
//     });
//     await batch.commit();
//     console.log('done');
// };

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

// export const getCategoriesAndDocuments = async () => {
//     const collectionRef = collection(db, 'categories');
//     const q = query(collectionRef);

//     const querySnapshot = await getDocs(q);
//     const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//         const { title, items } = docSnapshot.data();
//         acc[title.toLowerCase()] = items;
       
//     },{});
//     return categoryMap;
// }

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
   
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     console.log('categoryMap is ', docSnapshot.data());
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
   
     //return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef); 
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    

    //if user data doesn't exist
    
    if (!userSnapshot.exist) {
        //create set the document with data from the user auth from my collection

        const { displayName, email } = userAuth;
        const createdAt = new Date();
       // console.log('just checking', additionalInformation);
        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation});
        }
        catch (error) {
            console.log("error creating the user", error.message);
            
        }

    }
    
 
    //if user data exist
    //return userdocref

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);