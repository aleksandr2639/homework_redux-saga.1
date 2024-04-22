import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import skillsSlice from "../reducer/skill";
import saga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { skill: skillsSlice },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      sagaMiddleware
    );
  },
});

sagaMiddleware.run(saga);

export default store;
