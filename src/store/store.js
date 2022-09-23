// conbined place where all of our redux happens

import { compose, createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// const curryFunc = (a) => (b, c) => {
//     a + b - c
// }
// const with3 = curryFunc(3);
// with3(3, 4);

// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }
    
//     console.log('Type: ', action.type);
//     console.log('Payload: ', action.payload);
//     console.log('Current STate: ', store.getState());
    
//     next(action);
    
//     console.log('Next State: ', store.getState());
// }
//root reducer

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const persistConfig = {
    key: 'root',
    storage,
    blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);
    
//const middleWares = [loggerMiddleware];
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean );
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);