// import logo from './logo.svg';
import React from "react";
import "./App.css";
import MainLayout from "./components/common/mainlayout";
function App() {
  if (
    localStorage.getItem("userType") === "admin" &&
    window.location.pathname !== "/userpdf"
  ) {
    document.body.classList.add("admin_body");
  }
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
}

export default App;
