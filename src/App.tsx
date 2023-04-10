import { useState } from "react";
import Sidebar from "./sideNavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Chat } from "./liveChat";
import "./assets/app.css"

function App() {
  
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div style={{paddingLeft: "40vh"}} className="appContent"><Chat room={"sss"} /></div>
      </div>
    </Router>
  );
}

export default App;
