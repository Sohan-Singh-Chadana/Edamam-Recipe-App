import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipesSlice";
import typesReducer from "./typesSlice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const rootReducer = {
  recipes: recipeReducer,
  types: typesReducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
