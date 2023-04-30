import { useState } from "react";
import Sidebar from "./pages/sideNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat } from "./live-chat/liveChat";
import ChatList from "./live-chat/ChatList";
import "./assets/app.css"
import Home from "./pages/Home";
import ChatAdmin from "./live-chat/ChatAdmin";
import Users from "./users/Users";
import Jobs from "./jobs/Jobs";
import Login from './pages/Login';
import { AuthContextProvider } from './services/AuthContext';
import ProtectedRoute from './PrivateRoutes';
import Logout from "./pages/Logout";


function App() {

  return (
    <Router>

      <div className="App">
        <Sidebar />
        <div className="content">
          <AuthContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/liveChat/:id" element={<ProtectedRoute><ChatAdmin /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            </Routes>
          </AuthContextProvider>
        </div>
      </div>

    </Router>
  );
}

export default App;



