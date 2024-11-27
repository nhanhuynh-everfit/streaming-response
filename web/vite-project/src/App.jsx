import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StreamingResponse from "./StreamingResponse";

function App() {
  return (
    <>
      <div>
        <StreamingResponse />
      </div>
    </>
  );
}

export default App;
