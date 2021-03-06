const formData = [
  {
    id: 1,
    name: "First Name",
    label: "first_name",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "TextField",

    method: null,
    url: null,
    required: false,
    additionalConfig: { rows: 2, multiline: true },
  },
  {
    id: 2,
    name: "Last Name",
    label: "last_name",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "TextField",

    method: null,
    required: true,
    url: null,
    additionalConfig: {},
  },
  {
    id: 3,
    name: "Ideas",
    label: "ideas",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Select",

    required: true,
    method: "get",
    additionalConfig: { required: true },
    url: "http://localhost:3000/dropdown.json",
    menuItems: [],
  },
  {
    id: 4,
    name: "Gender",
    label: "gender",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Select",

    method: null,
    url: null,
    additionalConfig: {},
    menuItems: [
      { key: "male", value: "Male" },
      { key: "female", value: "Female" },
      { key: "others", value: "Others" },
    ],
  },
  {
    id: 5,
    name: "Gender2",
    label: "gender2",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Select",
    type: "text",
    method: null,
    url: null,
    additionalConfig: {},
    menuItems: [
      { key: "male", value: "Male" },
      { key: "female", value: "Female" },
      { key: "others", value: "Others" },
    ],
  },
  {
    id: 6,
    name: "Password",
    label: "password",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Password",
    required: true,

    method: null,
    url: null,
    additionalConfig: {},
  },
  {
    id: 7,
    name: "Todays Date",
    label: "today_date",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Date",
    required: false,

    method: null,
    url: null,
    additionalConfig: {},
  },
  {
    id: 8,
    name: "Date of Birth",
    label: "dob",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "Date",
    required: true,

    method: null,
    url: null,
    additionalConfig: {},
  },
  {
    id: 9,
    name: "Agree Terms",
    label: "agree_terms",
    value: "string",
    maxLength: 80,
    mixLength: 3,
    field: "CheckBox",
    required: true,

    method: null,
    url: null,
    additionalConfig: {},
  },
];

// cascade dropdown
// Submit using post all the form data
// Create middleware for cuntries api's

export default formData;

// console.log(JSON.stringify(formData));
