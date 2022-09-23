import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/checkout/checkout.component';
//user context
import { createContext, useState, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "./utils/firebase/firebase.utils";
import { createAction } from "./utils/reducer/reducer.utils";
import { setCurrentUser } from './store/user/user.action';
import {useDispatch} from 'react-redux'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  }, [dispatch])


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        {/* will always be shown when it matches the parent path  */}
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    
    </Routes>
  );

 
};

export default App;
