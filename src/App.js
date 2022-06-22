import MyInstaller from "./MyInstaller";
import "./App.css";
import Form from "./components/Form";
import formData from "./formData";

function App() {
  return (
    <div className="App">
      <MyInstaller>
        <h1>Hello Dev</h1>

        <Form formData={formData} />
      </MyInstaller>
    </div>
  );
}

export default App;
