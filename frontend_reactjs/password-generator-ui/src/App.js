import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/api/password/generate?name=${name}`
      );
      setPassword(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating password!");
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="main-background">
      <div className="floating-lights"></div>
      <div className="box">
        <h1>🔐 Secure 3D Password Generator</h1>

        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={generatePassword}>Generate Password</button>

        {password && (
          <div className="result-box">
            <h3>{password}</h3>
            <button className="copy-btn" onClick={copyPassword}>
              📋 Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
