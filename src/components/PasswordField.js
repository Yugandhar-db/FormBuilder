import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Password = ({ conf }) => {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <TextField
      {...conf}
      style={{ paddingTop: "10px" }}
      fullWidth
      type={values.showPassword ? "text" : "password"}
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment
            onClick={handleClickShowPassword}
            style={{ cursor: "pointer" }}
            position="start"
          >
            {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Password;
