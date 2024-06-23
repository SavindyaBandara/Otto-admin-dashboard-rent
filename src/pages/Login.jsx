import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'admin.doe@example.com',
    password: 'password123',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      if (response?.data?.user?.userId) {
        localStorage.setItem('userId', response.data.user.userId);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Login</h1>
      <form onSubmit={handleSubmit} className='login__form'>
        <div className='form__group'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
          />
        </div>
        <div className='form__group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </div>
        <button type='submit' className='login__btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;