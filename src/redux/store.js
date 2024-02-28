import { createStore, compose } from "redux";

import rootReducer from "./reducers/_root.reducer"; // imports ./redux/reducers/index.js


// Use Redux DevTools Extension in development
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    // tells the saga middleware to use the rootReducer
    // rootSaga contains all of our other reducers
    rootReducer,
    // adds all middleware to our project including saga and logger
    composeEnhancers()
);

export default store;
