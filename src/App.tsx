import { useState } from "react";
import Sidebar from "./sideNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat } from "./liveChat";
import ChatList from "./ChatList";
import "./assets/app.css"
import Home from "./Home";
import ChatAdmin from "./ChatAdmin";

function App() {
  
  return (
    <Router>
      <div className="App">
      <Sidebar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/liveChat" element={<ChatAdmin />} />  
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



