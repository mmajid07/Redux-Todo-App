import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Provider } from "react-redux";
import { TodoScreen } from "./TodoApp/TodoScreen";
import Store from "./Redux/Store";
import { Auth } from "./ShopingApp/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./ShopingApp/LoginScreen";
import RegisterScreen from "./ShopingApp/RegisterScreen";
import { MainScreen } from "./ShopingApp/MainScreen";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <MainScreen /> : <LoginScreen />}
            />
            <Route path="/loginScreen" element={<LoginScreen />} />
            <Route path="/registerScreen" element={<RegisterScreen />} />
            <Route path="/mainScreen" element={<MainScreen />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
