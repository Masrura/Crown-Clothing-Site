export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('Type: ', action.type);
    console.log('Payload: ', action.payload);
    console.log('Current STate: ', store.getState());

    next(action);

    console.log('Next State: ', store.getState());
}