import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ setIsRegistered, setErrorMessage, setShowModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      setSuccessMessage('User registered successfully! Redirecting to login...');
      setTimeout(() => {
        setIsRegistered(true);
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg === "User already exists") {
        setErrorMessage("User already registered. Please log in.");
        setShowModal(true); // Show the modal with the error message
        setIsRegistered(true);
      } else {
        setErrorMessage("Registration error. Please try again.");
      }
      console.error("Registration error", error.response?.data || error.message);
    }
  };

  // return (
  //   <div>
  //     {successMessage && <p>{successMessage}</p>}
  //     <form onSubmit={onSubmit}>
  //       <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
  //       <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
  //       <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="register-container">
      <h1>Welcome to DTunes</h1>
      <p>Your ultimate music streaming platform powered by YouTube API. Enjoy a seamless music experience!</p>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={onSubmit} className="register-form">
        <input 
          type="text" 
          name="username" 
          value={username} 
          onChange={onChange} 
          placeholder="Username" 
          required 
          className="input-field"
        />
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={onChange} 
          placeholder="Email" 
          required 
          className="input-field"
        />
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={onChange} 
          placeholder="Password" 
          required 
          className="input-field"
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );

};

export default Register;
