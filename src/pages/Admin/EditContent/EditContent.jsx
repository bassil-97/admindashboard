import React, { useState } from "react";
import "./EditContent.css";

import { useHttpClient } from "../../../hooks/http-hook";

export default function EditContent({
  content,
  fetchAboutUsContent,
  contactUsContent,
  fetchContactUsContent,
}) {
  const { sendRequest } = useHttpClient();
  
  const [contactUsData, setContactUsData] = useState({
    location: contactUsContent.our_location,
    phoneNumber: contactUsContent.phonenumber,
    email: contactUsContent.email,
  });
  
  const handleChange = (e) => {
    setContactUsData({
      ...contactUsData,
      [e.target.name]: e.target.value
    })
  };

  const contentUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/update-aboutus-content`,
        "PATCH",
        JSON.stringify({
          aboutUsText: "",
          whyChooseUs: "",
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );

      fetchAboutUsContent();
    } catch (err) {
      console.log(err);
    }
  };

  const contactUsUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/update-contactus-content`,
        "PATCH",
        JSON.stringify({
          ourLocation: contactUsData.location,
          phoneNumber: contactUsData.phoneNumber,
          email: contactUsData.email,
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );

      fetchContactUsContent();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-content__container">
      <h1>About Us Details</h1>
      <form onSubmit={contentUpdateHandler}>
        <div className="row">
          <div className="col">
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <button type="submit" disabled={!formState.isValid}>
          Update Content
        </button>
      </form>
      <hr />
      <h1>Contact Us Details</h1>
      <form onSubmit={contactUsUpdateHandler}>
        <div className="row">
          <div className="col">
            <label htmlFor="ourLocation" className="form-label fw-bold">
              Location Text 
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="location"
              value={contactUsData.location}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="phoneNumber" className="form-label fw-bold">
              Phone Number Text
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="phoneNumber"
              value={contactUsData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="ourLocation" className="form-label fw-bold">
              Email Text
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="email"
              value={contactUsData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">
          Update Content
        </button>
      </form>
    </div>
  );
}
