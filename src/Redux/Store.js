import { configureStore } from "@reduxjs/toolkit";
import ReduxTodoSlice from "./TodoSlice";
import ShopingAppReducer from "./ShopingAppSlice";

const Store = configureStore({
  reducer: {
    ReduxTodo: ReduxTodoSlice,
    ShoppingSlice: ShopingAppReducer,
  },
});

export default Store;
