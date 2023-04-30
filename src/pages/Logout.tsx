import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../services/AuthContext";

export default function logout() {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("sdf");
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <>Logout</>;
}
