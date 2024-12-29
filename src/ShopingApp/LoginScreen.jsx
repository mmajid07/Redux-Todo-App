import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setIsLogin } from "../Redux/ShopingAppSlice";

const LoginScreen = () => {
  const initialValue = { email: "", password: "" };
  const [loginData, setLoginData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authData, isLogin } = useSelector((state) => state?.ShoppingSlice);

  console.log("Auth Data is >>", authData);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("register"));
    if (storedData) {
      dispatch(setAuthData(storedData));
    }
  }, [dispatch]);

  const handleOnChangeValue = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const Validate = () => {
    const newError = {};
    let isValid = true;
    if (!loginData.email) {
      newError.email = "Email is required!";
      isValid = false;
    }
    if (!loginData.password) {
      newError.password = "Password is required!";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (Validate()) {
      const user = authData?.find(
        (data) =>
          data?.email === loginData?.email &&
          data?.password === loginData?.password
      );

      if (user) {
        localStorage.setItem("isLoggedIn", true);
        dispatch(setIsLogin(true));
        navigate("/mainScreen");
      } else {
        setErrors({ general: "Invalid email or password!" });
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        {errors.general && (
          <Typography variant="body2" color="error" gutterBottom>
            {errors.general}
          </Typography>
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={loginData?.email}
          onChange={handleOnChangeValue}
        />
        {errors.email && (
          <Typography variant="body2" color="error">
            {errors.email}
          </Typography>
        )}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={loginData?.password}
          onChange={handleOnChangeValue}
        />
        {errors.password && (
          <Typography variant="body2" color="error">
            {errors.password}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: "15px", color: "blue", cursor: "pointer" }}
        >
          <Link to={"/registerScreen"}>
            Don't have an account? Register here
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginScreen;
