import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../Redux/ShopingAppSlice";

const RegisterScreen = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [registerData, setRegisterData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state?.ShoppingSlice);

  console.log("Redux Data is >>", authData);

  const handleOnChangeValue = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const Validate = () => {
    const newError = {};
    let isValid = true;
    if (!registerData.name) {
      newError.name = "Name is Required!";
      isValid = false;
    }
    if (!registerData.email) {
      newError.email = "Email is Required!";
      isValid = false;
    }
    if (!registerData.password) {
      newError.password = "Password is Required!";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  console.log("Local Product is >>");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Validate()) {
      // Dispatch the registration data to Redux if needed
      dispatch(setAuthData([{ ...registerData }]));

      // Retrieve existing data from localStorage or use an empty array
      const previousData = JSON.parse(localStorage.getItem("register")) || [];
      // Add new data to localStorage
      localStorage.setItem(
        "register",
        JSON.stringify(...previousData, registerData)
      );

      console.log("Data saved successfully!");
    } else {
      console.error("Please Enter Valid Detail");
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={registerData.name}
          onChange={handleOnChangeValue}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={registerData.email}
          onChange={handleOnChangeValue}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={registerData.password}
          onChange={handleOnChangeValue}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Register
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: "15px", color: "blue", cursor: "pointer" }}
          onClick={() => {}}
        >
          <Link to={"/loginScreen"}>Already have an account? Login here</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterScreen;
