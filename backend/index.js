import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8005;
const URI = process.env.MONGO_URI;
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import userAuthRoute from './routes/userAuth.route.js';
import connectToMongoDB from './connectDB/connectToMongoDB.js';
// import {validateUser} from './middlewares/validateUser.middleware.js'

// Connect to MOngoDB and Start the server
connectToMongoDB(URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch(err=>{
    console.log('Mongo Connection Failed ', err);
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
// app.use(validateUser());


// Routes
app.use('/users', userAuthRoute);

