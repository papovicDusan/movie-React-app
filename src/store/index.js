import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/slice";
import sagas from "./sagas";
import moviesReducer from "./movies/slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
