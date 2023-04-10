import { useState } from "react";
import Sidebar from "./sideNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat } from "./liveChat";
import ChatList from "./ChatList";
import "./assets/app.css"
import Home from "./Home";

function App() {
  
  return (
    <Router>
      <div className="App">
      <Sidebar />
        {/*
        <div style={{paddingLeft: "40vh"}}><ChatList /></div>
        <div style={{paddingLeft: "65vh"}}><Chat id={"sss"} /></div>
  */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/liveChat" element={<Chat id={"sss"} />} />  
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
