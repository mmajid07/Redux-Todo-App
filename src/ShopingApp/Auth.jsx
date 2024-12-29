import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainScreen } from "./MainScreen";
import LoginScreen from "./LoginScreen";
import { setIsLogin } from "../Redux/ShopingAppSlice";

export const Auth = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.ShoppingSlice);
  console.log(`seee it dark`, isLoggedIn);
  useEffect(() => {
    // If isLoggedIn is null, default to false
    dispatch(setIsLogin(isLoggedIn));
  }, [isLogin]);

  return <div>{isLoggedIn ? <MainScreen /> : <LoginScreen />}</div>;
};
