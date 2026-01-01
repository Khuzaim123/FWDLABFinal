import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './bookRouter.js'
import { bookMiddleware } from './bookMiddleWare.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bookMiddleware);
mongoose.connect('mongodb://localhost:27017/mernCrud').then(() => console.log("Conneted")).catch(() => console.log("Not Connected"));

app.use("/api/books" , router);

app.listen(5000 , () => console.log("Server Running")); 