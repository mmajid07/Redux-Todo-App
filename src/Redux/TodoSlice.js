import { createSlice } from "@reduxjs/toolkit";

const ReduxTodoSlice = createSlice({
  name: "ReduxTodo",
  initialState: { input: "", todos: [], counter: 0 },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    Increament: (state, action) => {
      state.counter = action.payload;
    },
    Decreament: (state, action) => {
      state.counter = action.payload;
    },
  },
});

export const { setInput, setTodos, Increament, Decreament } =
  ReduxTodoSlice.actions;

export default ReduxTodoSlice.reducer;
