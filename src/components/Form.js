import { useState, useEffect, useRef } from "react";
import { Box, Button, Alert } from "@mui/material";
import Editor from "@monaco-editor/react";

import { getFields, getFormFields } from "../utils";
import InputModel from "./InputModal";

const Form = ({ formData }) => {
  const divRef = useRef(1);
  const [sFdata, setSFData] = useState(formData);
  const [fields, setFields] = useState(getFormFields(formData));
  const [marks, setMarks] = useState([]);
  const editorRef = useRef(null);
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const addFieldHandler = (jsonvalues) => {
    // adds an additional field to form
    const obj = {
      id: sFdata.length + 1,
      name: jsonvalues.display_name,
      label: jsonvalues.label,
      value: "string",
      maxLength: 80,
      mixLength: 3,
      field: jsonvalues.type,
      type: "text",
      method: jsonvalues.method,
      url: jsonvalues?.url,
      required: jsonvalues.required,
      menuItems: jsonvalues?.menuItems,
    };

    const fvalue = obj.field === "Date" ? null : "";
    setFields((prev) => ({
      ...prev,
      [`${obj.label}`]: fvalue,
    }));

    setSFData((prev) => [...prev, obj]);
    divRef.current = divRef.current + 1;

    // setFields({...fields,{`${obj.label}`:fValue}} );

    // console.log("editorRef.current", editorRef.current);
    // editorRef.current._domElement.innerText = JSON.stringify(sFdata);
  };

  const handleChange = (event) => {
    // updates the state values on change of any field value
    try {
      // update the states
      const { name, value, type, checked } = event.target;
      if (type === "checkbox") {
        setFields((prev) => ({ ...prev, [name]: checked }));
      } else {
        setFields((prev) => ({ ...prev, [name]: value }));
      }
    } catch {
      // if event doesn't exists
      console.log("No event Exists");
    }
  };

  const handleSubmit = () => {
    setFormError(false);
    sFdata.map((field) => {
      if (field.required === true) {
        const value = fields[field.label];
        if (
          (field.field === "TextField" || "Select" || "Password" || "Date") &&
          (value === null || value === undefined || value === "")
        ) {
          // console.log(field.field);
          setFormError(true);
        } else if (field.field === "CheckBox" && value === false) {
          setFormError(true);
        }
      }
    });

    if (!formError) {
      console.log("fields===>", fields);
      // console.log("sfData===>", sFdata);
    }
  };

  const handleEditorChange = (value, event) => {
    console.log("event", event);
    if (marks.length === 0) {
      setSFData(() => JSON.parse(value));
    }
  };

  const onValidate = (markers) => {
    console.log("markers", markers);
    setMarks(() => markers);
  };

  useEffect(() => {
    setSFData(() => [...sFdata]);

    const getDropDownValues = async () => {
      const filterFormData = sFdata.filter(
        (e) => e.url && e.method === "get" && e.field === "Select"
      );
      for (const element of filterFormData) {
        const list = await fetch(element.url).then((resp) => resp.json());
        setSFData((prev) =>
          prev.map((e) => {
            if (element?.id === e?.id) {
              e.menuItems = list.data;
            }
            return e;
          })
        );
      }
    };

    getDropDownValues();
  }, [sFdata]);

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box style={{ width: "500px" }}>
          {sFdata
            ?.filter((d) => d.id && d.label && d.name)
            .map((e) => {
              return getFields({
                data: e,
                inputConfig: {
                  ...e?.additionalConfig,
                  key: e?.id,
                  id: e?.label,
                  label: e?.name,
                  name: e?.label,
                  value: fields[e?.label],
                  onChange: (eve) => {
                    handleChange(eve);
                  },
                  required: e.required,
                },
              });
            })}

          {formError && (
            <Alert severity="error">Plase fill the required fields</Alert>
          )}

          <Button
            style={{ background: "#3928d6" }}
            onClick={handleSubmit}
            variant="contained"
            margin="normal"
          >
            Submit
          </Button>
          <Button
            style={{ background: "#3928d6", marginLeft: "0.1rem" }}
            variant="contained"
            margin="normal"
            onClick={handleOpen}
          >
            Add Field
          </Button>
        </Box>

        <InputModel
          openState={open}
          close={handleClose}
          add={addFieldHandler}
        />
      </form>

      <div ref={divRef}>
        <Editor
          theme="vs-dark"
          height="80vh"
          width="50vw"
          defaultLanguage="json"
          value={JSON.stringify(sFdata)}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default Form;
