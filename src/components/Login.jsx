import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      console.log("Login successful", response.data);
    } catch (error) {
      //console.error("Login error", error.response.data);
      console.error("Login error", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
