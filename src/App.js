import React from "react";
import "./App.css";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Header />
        <Tracker />
      </div>
      <Footer />
    </div>
  );
}

export default App;
