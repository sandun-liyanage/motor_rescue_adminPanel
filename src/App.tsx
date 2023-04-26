import { useState } from "react";
import Sidebar from "./sideNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat } from "./live-chat/liveChat";
import ChatList from "./live-chat/ChatList";
import "./assets/app.css"
import Home from "./Home";
import ChatAdmin from "./live-chat/ChatAdmin";
import Users from "./users/Users";
import Jobs from "./jobs/Jobs";

function App() {
  
  return (
    <Router>
      <div className="App">
      <Sidebar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/liveChat/:id" element={<ChatAdmin />} /> 
            <Route path="/users" element={<Users />} /> 
            <Route path="/jobs" element={<Jobs />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



