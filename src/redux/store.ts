import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

//store.subscribe(() => console.log("store updated!", store.getState()));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
