import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, TextField } from "@mui/material";
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
    <FormControl margin="dense" fullWidth>
      <TextField
        {...conf}
        fullWidth
        type={values.showPassword ? "text" : "password"}
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
    </FormControl>
  );
};

export default Password;
