import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Editor from "@monaco-editor/react";
import { Alert } from "@mui/material";
import { getFields, getFormFields } from "../utils";

const Form = ({ formData }) => {
  const divRef = useRef(1);
  const [sFdata, setSFData] = useState([]);
  const [fields, setFields] = useState(getFormFields(formData));
  const [marks, setMarks] = useState([]);
  const editorRef = useRef(null);
  const [formError, setFormError] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleChange = (event) => {
    // updates the state values on change of any field value
    try {
      // if event exits

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
    setSFData(() => [...formData]);
    const getDropDownValues = async () => {
      const filterFormData = formData.filter(
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
  }, []);

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
        </Box>
      </form>

      {/* <div ref={divRef}>
        <Editor
          theme="vs-dark"
          height="80vh"
          width="50vw"
          defaultLanguage="json"
          value={JSON.stringify(sFdata)}
          onMount={handleEditorDidMount}
        />
      </div> */}
    </div>
  );
};

export default Form;
