import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, TextField } from "@mui/material";

function KeyValue({ data, id, option, handleOptionEdit, handleDeleteField }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FormControl margin="dense">
        <TextField
          size="small"
          style={{ marginRight: "0.5rem" }}
          value={option.key}
          label={`Key ${id}`}
          onChange={(e) => {
            handleOptionEdit({ type: "key", id: id, value: e.target.value });
          }}
        />
      </FormControl>
      <strong>:</strong>
      <FormControl margin="dense">
        <TextField
          size="small"
          style={{ marginLeft: "0.5rem" }}
          value={option.value}
          label={`Value ${id}`}
          onChange={(e) => {
            handleOptionEdit({ type: "value", id: id, value: e.target.value });
          }}
        />{" "}
      </FormControl>
      <CloseIcon
        onClick={(e) => {
          handleDeleteField(id);
        }}
        style={{ cursor: "pointer", marginLeft: "1rem" }}
      />
    </div>
  );
}

export default KeyValue;
