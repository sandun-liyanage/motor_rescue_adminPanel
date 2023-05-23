import { useState, useRef, useEffect } from "react";
import Sidebar from "./pages/sideNavBar";
import { BrowserRouter as Router, Route, Routes, useLocation  } from "react-router-dom";
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
import { useIdleTimer } from 'react-idle-timer'
import logout from "./pages/Logout";



function App() {
  const sessionTimeoutRef = useRef(null)
  localStorage.setItem('user', 'true');

  const onIdle = () => {
    try{
    if(localStorage.getItem('user') != false){
      console.log('User is idle')
      setModal(true);
      sessionTimeoutRef.current = setTimeout(logOut, 500 * 1000)
      pause();
    }
    console.log(localStorage.getItem('user'))
  }catch(e){
    console.log(e.message)
  }
  }

  async function logOut () {
    localStorage.setItem('user', 'false');
    clearTimeout(sessionTimeoutRef.current)
    console.log('User has been logged out')
    setModal(false);
    try{
      window.location.href = '/logout'
    } catch (e) {
      console.log(e.message);
    }
  }

  const onActive = () => {
    //setState('Active')
  }

  const onAction = () => {
    //setCount(count + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 500 * 1000,
    throttle: 500
  })


  


  //-------------modal----------------

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //------------------------------------

  return (
    <div>
      <Router>
    
        <AuthContextProvider>
          <div className="App">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/liveChat/:id" element={<ProtectedRoute><ChatAdmin /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>

        </AuthContextProvider>
      </Router>

      {modal && (
        <div className="modalz">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalz-content">
            <br />
            <h2>You have been inactive for a while. Do you want to logout?</h2>
            <br /><br /><br />
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
            <div className="btnClass">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={logOut}
              >
                Logout
              </button>
              <div className="btn btn-outline-danger" style={{paddingRight: "5px", border: "0"}}></div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={toggleModal}
              >
                Keep me Logged in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



