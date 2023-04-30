import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { UserAuth } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../assets/loginPage.css"
import "../assets/modal.css"

export default function Login() {
  const [email, setemail] = useState("admin@motorrescue.com");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login}  = UserAuth();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setError("asfd")
      setLoading(true);
      await login(email, password);
      navigate("/")
    } catch (e: any){
      await setError('' + e.message);
      toggleModal();
    }
    
    console.log(error)
    setLoading(false);
  }

  //--------------------------------------------------

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="loginPage">
      <Card>
        <Card.Body>
        <center>
        <h1 className="display-6">Log In</h1>
        </center>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder= "admin@motorrescue.com"
                onChange={(e) => setemail(e.target.value)}
                readOnly
              />
            </div>
            <br />
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              style={{float:"right"}}
            >
              Login
            </button>
          </form>
        </Card.Body>
      </Card>

      {modal && (
          <div className="modalz">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modalz-content">
              <h2 style={{color:"red"}}>Error</h2>
              <p>{error}</p>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
              <div className="btnClass">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
