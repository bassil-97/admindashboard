import React, { useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

export default function LoginPage() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData[0].id, responseData[0].token, responseData[0]);
      if(responseData[0].role === 'admin') navigate(`/${responseData[0].role}/dashboard`);
    } catch (err) {}
  };

  return (
    <div className="admin-login__container">
      <div className="row w-100 p-2">
        <div className="col-xs-12 col-lg-4 px-4 center">
          <h1 className="fw-bold mb-2 text-center">Welcome Back</h1>
          <h6 className="mb-5 text-center">Please enter your details</h6>
          <form onSubmit={loginHandler} className="w-100">
            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
           <button type="submit">submit</button>
          </form>
        </div>
        <div className="col-xs-12 col-lg-8 center">
        <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_m6j5igxb.json"  background="transparent"  speed="1"  style={{width: "500px", height: "500px"}}  loop  autoplay></lottie-player>
        </div>
      </div>
    </div>
  );
}
