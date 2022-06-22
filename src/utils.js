import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Password from "./components/PasswordField";
import DateField from "./components/DatePickerField";

const getFields = ({ data, inputConfig }) => {
  const typeOfInputs = {
    TextField: (
      <FormControl margin="dense" key={data.id} fullWidth>
        <TextField color="secondary" {...inputConfig} />
      </FormControl>
    ),
    // Insertion of DateField
    Date: <DateField key={data.id} conf={inputConfig} />,
    // Insertion of PasswordField
    Password: <Password key={data.id} conf={inputConfig} />,
    Select: ({ data, inputConfig }) => {
      return (
        <FormControl
          margin="dense"
          key={data.id}
          required={data.required}
          fullWidth
        >
          <InputLabel id={`select-label-${data.name}`}>{data.name}</InputLabel>
          <Select labelId={`select-label-${data.name}`} {...inputConfig}>
            {data.menuItems?.map((item) => {
              return (
                <MenuItem key={item.key} value={item.key}>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    },
    CheckBox: (
      <FormGroup key={data.id}>
        <FormControlLabel
          required={data.required}
          control={<Checkbox {...inputConfig} />}
          label={data.required ? `${data.name} *` : data.name}
        />
      </FormGroup>
    ),
  };
  if (data.field === "Select") {
    return typeOfInputs[data.field]({ data, inputConfig });
  }
  return typeOfInputs[data.field];
};

const getFormFields = (formData = []) => {
  const fields = {};

  formData?.forEach((e) => {
    // depending on type of field, initializing either null or emtpy string
    if (e.field === "Date") {
      fields[e.label] = null;
    } else {
      fields[e.label] = "";
    }
  });
  return fields;
};

export { getFields, getFormFields };
