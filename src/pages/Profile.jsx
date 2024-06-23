import React, { useState, useEffect } from 'react';
import { findUserById, updateUser } from '../api';
import "../styles/profile.css";

const Profile = () => {
  const userId = localStorage.getItem('userId') || 6;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNO: '',
    address: '',
    profilePic: '', // Assuming this is the URL
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(userId);
        const response = await findUserById(userId);
        const userData = response.data;
        console.log(userData);
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNO: userData.phoneNO,
          address: userData.address,
          profilePic: userData.profilePic,
          password: userData.password, // Ensure security measures for handling password
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    // Assuming profilePic is a URL, you might handle uploading here if necessary
    setFormData({ ...formData, profilePic: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (formData.profilePic) {
        // Handle file upload logic here if necessary
        // For example, upload the photo to a server and get the URL
        // updateData.profilePic = uploadedPhotoUrl;
      }
      const response = await updateUser(userId, updateData);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='profile'>
      <h1 className="profile__title">Profile</h1>
      <div className="details__form">
        <p className="profile__desc">
          Update your photo and personal details here!
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
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
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
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNO"
                value={formData.phoneNO}
                onChange={handleChange}
                placeholder="Enter your phone number"
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
                placeholder="Enter your address"
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
                name="profilePic"
                onChange={handleFileChange}
              />
            </div>

            <div className="profile__img-btns">
              <button type="submit" className="update__btn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
