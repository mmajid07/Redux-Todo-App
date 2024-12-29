import React from "react";
import { TextField, InputAdornment } from "@mui/material";

const CustomTextField = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  endIcon,
  type,

  borderRadius = "16px", // Default border radius
}) => {
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: borderRadius, // Apply custom border radius
        },

        backgroundColor: "white",

        borderRadius: borderRadius,
      }}
      InputProps={{
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomTextField;
