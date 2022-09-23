import { createContext, useState, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "../store/user/user.types";
//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    
})
// export const USER_ACTION_TYPES = {
//     SET_CURRENT_USER: 'SET_CURRENT_USER'
// }

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    console.log('dispatch');
    console.log('action is ', action);
    // action has 2 parameter i.e type and payload
    const { type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled $(type) in UserReducer`);
    }
}

export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);
    //const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    
    console.log('current user is',currentUser);
    const setCurrentUser = user => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    //This dispatch function is a function that whenever you call it, you pass it an action object. So if you want this user reducer to receive an action, you have to call dispatch and dispatch will take that action and then pass it in, where I will then run through the switch statement and update

    const value = { currentUser, setCurrentUser };
    //signOutUser();
//useEffect run whatever we return
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);

        })
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}