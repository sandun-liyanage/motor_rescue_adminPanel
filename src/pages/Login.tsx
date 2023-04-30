import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { UserAuth } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../assets/loginPage.css"

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
    }
    
    console.log(error)
    setLoading(false);
  }

  return (
    <div className="loginPage">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
            >
              Submit
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
