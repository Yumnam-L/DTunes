// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
import axios from "axios";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://adrianyumnam:p6UBZQPrHtczx6vr@cluster0.ry7aant.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route to search YouTube
app.get('/search', async (req, res) => {
    const { query } = req.query; // Get the search query from the request
  
    try {
      // Make a request to the YouTube Data API
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          key: "AIzaSyAWT2J3lmYzUi-MCXI7oRE1_WjIOpGRMaE",
          type: 'video',
          videoCategoryId: '10', // Ensure we are searching for videos
          maxResults: 10 // Limit the number of results
        }
      });
      console.log('Response from YouTube API:', response.data);
      // Send the response data back to the client
      res.json(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
