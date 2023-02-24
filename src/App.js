// import logo from './logo.svg';
import React from "react";
import "./App.css";
import EmployerLayout from "./components/employer/layout";
import EmployeeLayout from "./components/employee/layout";

function App() {
  return (
    <div className="App">
      <EmployeeLayout />
      {/* <EmployerLayout /> */}
    </div>
  );
}

export default App;
