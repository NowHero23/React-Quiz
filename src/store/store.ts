import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizSlice from "./reducers/QuizSlice";
import editQuizSlice from "./reducers/EditQuizSlice";
import actionSlice from "./reducers/ActionSlice";

const rootReducer = combineReducers({
  quizSlice,
  editQuizSlice,
  actionSlice,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
