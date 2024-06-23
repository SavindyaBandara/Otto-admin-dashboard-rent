import React, { useState } from "react";
import "../styles/settings.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
    phoneNO: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const profilePicURL = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: profilePicURL });
    }
  };

  const handleDeletePhoto = () => {
    setFormData({ ...formData, profilePic: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you can send formData to your backend API
      console.log("User added successfully:", formData);
      // Clear the form data after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profilePic: "",
        phoneNO: "",
        address: ""
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="add-user-form">
      <h1 className="add-user__title">Add User</h1>
      <p className="add-user__desc">
        Fill in the details to add a new user.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNO"
              value={formData.phoneNO}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Your Photo</label>
            <p className="profile-img__desc">
              This will be displayed in your profile
            </p>
            <input
              type="file"
              placeholder="choose file"
              onChange={handleFileChange}
            />
            {formData.profilePic && (
              <div className="profile-img__preview">
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="profile-img__img"
                />
                <button
                  type="button"
                  className="dlt__btn"
                  onClick={handleDeletePhoto}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form__group--submit">
          <button type="submit" className="submit__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
