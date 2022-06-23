import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InputModal({ openState, close }) {
  const [fieldValue, setFieldValue] = useState({
    display_name: "",
    label: "",
    type: "",
    method: "",
    url: "",
  });

  const selectItems = [
    { value: "first" },
    { value: "second" },
    { value: "third" },
  ];

  const handleDNameChange = (event) => {
    setFieldValue((prev) => ({
      ...prev,
      ["display_name"]: event.target.value,
    }));
  };
  const handleLabelChange = (event) => {
    setFieldValue((prev) => ({
      ...prev,
      ["label"]: event.target.value,
    }));
  };
  const handleTypeChange = (event) => {
    setFieldValue((prev) => ({ ...prev, ["type"]: event.target.value }));
  };
  const handleMethodChange = (event) => {
    setFieldValue((prev) => ({ ...prev, ["method"]: event.target.value }));
  };
  const handleURLChange = (event) => {
    setFieldValue((prev) => ({ ...prev, ["url"]: event.target.value }));
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(fieldValue));

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
              onChange={handleDNameChange}
              value={fieldValue.display_name}
              label="Display Name"
              required
              fullWidth
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <TextField
              onChange={handleLabelChange}
              value={fieldValue.label}
              label="Label"
              required
              fullWidth
            />
          </FormControl>
          <FormControl margin="dense" fullWidth required>
            <InputLabel id={`select-label-`}>Select Type</InputLabel>
            <Select
              labelId={`select-label-`}
              value={fieldValue.type}
              onChange={handleTypeChange}
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
          <FormControl margin="dense" fullWidth>
            <InputLabel id={`select-label-1`}>Select Method</InputLabel>
            <Select
              labelId={`select-label-1`}
              value={fieldValue.method}
              onChange={handleMethodChange}
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
          <FormControl margin="dense" fullWidth>
            <TextField
              onChange={handleURLChange}
              value={fieldValue.url}
              label="URL"
              required
              fullWidth
            />
          </FormControl>
          <Button variant="contained" margin="dense" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
