// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACX0yPMt_3YQrs3miHbFcIdUCYJWSt6tc",
    authDomain: "crown-clothing-e-commerce.firebaseapp.com",
    projectId: "crown-clothing-e-commerce",
    storageBucket: "crown-clothing-e-commerce.appspot.com",
    messagingSenderId: "162081928209",
    appId: "1:162081928209:web:f66bfc3230df23ec072db0"
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
   

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        console.log('categoryMap is ', docSnapshot.data());
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
   
    return categoryMap;
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