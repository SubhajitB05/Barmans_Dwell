import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8005;
const URI = process.env.MONGO_URI;
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import event from 'events';
event.EventEmitter.defaultMaxListeners = 20; // Set a higher limit globally

const app = express();

import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import connectToMongoDB from './connectDB/connectToMongoDB.js';

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
    origin:'https://barmans-dwell.vercel.app',
    // origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());


// Routes
app.use('/users', userRoute);
app.use('/admin', adminRoute);

