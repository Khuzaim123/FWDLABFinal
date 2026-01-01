import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './bookRouter.js'
import { bookMiddleware } from './bookMiddleWare.js';

// Initialize  Backend Server
const app = express();
app.use(express.json());
app.use(cors());
app.use(bookMiddleware);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernCrud').then(() => console.log("Conneted")).catch(() => console.log("Not Connected"));

// Base URL for all the apis
app.use("/api/books" , router);

// Listen on port 5000
app.listen(5000 , () => console.log("Server Running")); 