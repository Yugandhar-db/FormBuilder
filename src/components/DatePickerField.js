import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Alert } from "@mui/material";

export default function DateField({ conf }) {
  const required = conf.required;
  const [dateError, setDateError] = useState(false);

  const handleDateError = (err, val) => {
    // error handler to datefields
    if (err) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const changeHanlder = (e) => {
    conf.onChange({
      target: {
        value: e,
        name: conf.name,
        type: "date",
        checked: true,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={conf.label}
        value={conf.value}
        onError={handleDateError}
        onChange={changeHanlder}
        renderInput={(params) => (
          <TextField
            required={required}
            style={{ paddingTop: "10px" }}
            {...params}
            fullWidth
          />
        )}
      />
      {/* if  error in date input, display an Alert */}
      {dateError && <Alert severity="error">Please Enter proper Date</Alert>}
    </LocalizationProvider>
  );
}
