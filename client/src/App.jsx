import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routers from "./utils/Routers";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routers />
    </React.Fragment>
  );
}

export default App;
