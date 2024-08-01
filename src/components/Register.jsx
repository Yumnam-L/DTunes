import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      console.log("inside registration.jsx try block");
      const response = await axios.post('/api/register', formData);
      console.log("Registration successful", response.data);
      setIsRegistered(true); // Switch to login page after successful registration
    } catch (error) {
      console.error("Registration error", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
