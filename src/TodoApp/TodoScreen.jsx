import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setTodos, Increament, Decreament } from "../Redux/TodoSlice";

export const TodoScreen = () => {
  const [editIndex, setEditIndex] = useState("");
  const [edit, setEdit] = useState(false);
  const { input, todos, counter } = useSelector((state) => state?.ReduxTodo);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(setTodos(todos.map((v, i) => (i === editIndex ? input : v))));
      setEdit(false);
    } else {
      dispatch(setTodos([...todos, input]));
    }
    dispatch(setInput(""));
  };

  const handleEdit = (index) => {
    dispatch(setInput(todos[index]));
    setEditIndex(index);
    setEdit(true);
  };

  return (
    <div style={styles.container}>
      <h2>Redux Todo Web App</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}
          placeholder="Write Todo..."
          style={styles.input}
        />
        <input
          type="submit"
          value={edit ? "Update" : "Submit"}
          style={styles.submitButton}
        />
      </form>
      <ul style={styles.todoList}>
        {todos.map((item, index) => (
          <li key={index} style={styles.todoItem}>
            {item}
            <div>
              <button
                onClick={() => {
                  const newdata = todos.filter((v, i) => i !== index);
                  dispatch(setTodos(newdata));
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(index)}
                style={styles.editButton}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <hr />

      <div>
        <h1>{counter}</h1>
        <button
          style={{ marginRight: "5px" }}
          onClick={() => dispatch(Increament(counter + 1))}
        >
          Increament
        </button>

        <button onClick={() => dispatch(Decreament(counter - 1))}>
          Decreament
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    flex: "1",
    padding: "10px",
    marginRight: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#333",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  todoList: {
    listStyle: "none",
    padding: "0",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  deleteButton: {
    marginLeft: "10px",
    marginRight: "5px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#ffa500",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
