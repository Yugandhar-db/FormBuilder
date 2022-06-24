import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  Modal,
  Radio,
  InputLabel,
  FormControl,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Alert,
} from "@mui/material";

import style from "../styles/InputModal";
import KeyValue from "./KeyValue";

export default function InputModal({ openState, close, add }) {
  const [options, setOptions] = useState([
    { id: 1, key: "", value: "" },
    { id: 2, key: "", value: "" },
  ]);
  const [count, setCount] = useState(2);
  const [radioValue, setRadioValue] = useState("url");
  const [fieldValue, setFieldValue] = useState({
    display_name: "",
    label: "",
    type: "",
    method: "",
    url: "",
    required: false,
    additionalConfig: {},
  });

  const selectItems = [
    { value: "Date" },
    { value: "Select" },
    { value: "TextField" },
    { value: "CheckBox" },
    { value: "Password" },
  ];

  const handleFieldChange = (event) => {
    const { type, name, value, checked } = event.target;
    console.log(type, value, checked, name);
    if (type === "checkbox") {
      setFieldValue((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFieldValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleDeleteField = (id) => {
    const updated = [];
    options.map((e) => {
      if (e.id !== id) {
        updated.push(e);
      }
    });
    setOptions(updated);
  };

  const handleAddField = ({ id }) => {
    setCount(count + 1);
    setOptions(() => [
      ...options,
      { ["id"]: count + 1, ["key"]: "", ["value"]: "" },
    ]);
  };

  const handleOptionEdit = ({ type, id, value }) => {
    setOptions((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          e[type] = value;
        }
        return e;
      })
    );
  };

  useEffect(() => {
    setFieldValue({ ...fieldValue, menuItems: options });
  }, [options]);

  const handleSubmit = () => {
    console.log(fieldValue);
    add(fieldValue);
    close();
  };

  return (
    <div>
      <Modal
        open={openState}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} inputprops>
          <CloseIcon
            onClick={close}
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              // top: "25px",
            }}
          />
          <h2>Choose Field Type</h2>
          <FormControl margin="dense" fullWidth>
            <TextField
              onChange={handleFieldChange}
              value={fieldValue.display_name}
              label="Display Name"
              name="display_name"
              required
              fullWidth
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <TextField
              onChange={handleFieldChange}
              value={fieldValue.label}
              label="Label"
              name="label"
              required
              fullWidth
            />
          </FormControl>
          <FormControl margin="dense" fullWidth required>
            <InputLabel id={`select-label-`}>Select Type</InputLabel>
            <Select
              labelId={`select-label-`}
              value={fieldValue.type}
              onChange={handleFieldChange}
              name="type"
            >
              {selectItems?.map((item, id) => {
                return (
                  <MenuItem key={id} value={item.value}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {fieldValue.type === "Select" && (
            <>
              <FormControl margin="dense">
                <FormLabel id="demo-radio-buttons-group-label">
                  Select Type of Entry{" "}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={radioValue}
                  value={radioValue}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="url"
                    control={<Radio size="small" />}
                    label="URL"
                  />
                  <FormControlLabel
                    value="manual"
                    control={<Radio size="small" />}
                    label="Manual"
                  />
                </RadioGroup>
                {options.length < 2 && radioValue === "manual" && (
                  <Alert severity="error">
                    There must be atleast two options
                  </Alert>
                )}
              </FormControl>
              {radioValue === "url" ? (
                <>
                  <FormControl margin="dense" fullWidth>
                    <InputLabel id={`select-label-1`}>Select Method</InputLabel>
                    <Select
                      labelId={`select-label-1`}
                      value={fieldValue.method}
                      onChange={handleFieldChange}
                      name="method"
                    >
                      {selectItems?.map((item, id) => {
                        return (
                          <MenuItem key={id} value={`get${id}`}>
                            {`get${id}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl margin="dense" fullWidth>
                    <TextField
                      onChange={handleFieldChange}
                      value={fieldValue.url}
                      label="URL"
                      name="url"
                      required
                      fullWidth
                    />
                  </FormControl>
                </>
              ) : (
                <div style={{ display: "table", verticalAlign: "middle" }}>
                  {options.map((e) => {
                    return (
                      <KeyValue
                        data={e}
                        key={e.id}
                        id={e.id}
                        option={options.filter((item) => item.id === e.id)}
                        handleOptionEdit={handleOptionEdit}
                        handleDeleteField={handleDeleteField}
                      />
                    );
                  })}
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAddField}
                  >
                    Add Option
                  </Button>
                </div>
              )}
            </>
          )}

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldValue.required}
                  onChange={handleFieldChange}
                  name="required"
                />
              }
              label="Required"
            />
          </FormGroup>
          <Button variant="contained" margin="dense" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
