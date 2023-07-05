import React from "react";
import "./AddNewAdmin.css";

import { useHttpClient } from "../../../hooks/http-hook";

export default function AddNewAdmin() {

  const { isLoading, sendRequest } = useHttpClient();
 
  const addNewAdminHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/add-new-admin",
        "POST",
        JSON.stringify({
          email: "",
          password: "",
          username: "",
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-admin__container">
      <h4 className="fw-bold">Add new Admin</h4>
      <form onSubmit={addNewAdminHandler} className="w-100">
            <input type="text" required />
            <input type="email" required />
            <input type="password" required />
           <button type="submit">submit</button>
          </form>
    </div>
  );
}
