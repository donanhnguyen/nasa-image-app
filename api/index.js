import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'; 
import usersRoute from './routes/users.js'; 
import hotelsRoute from './routes/hotels.js'; 
import bookingsRoute from './routes/bookings.js';

const app = express(); 
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected  ')
    } catch (error) {
        throw error
    }    
}

mongoose.connection.on('disconnected', () => {
    console.log("disconnected!!!")
})

// middlewares

app.use(express.json());

app.use('/api/auth/', authRoute);
app.use('/api/users/', usersRoute);
app.use('/api/hotels/', hotelsRoute);
app.use('/api/bookings/', bookingsRoute);

app.listen(8800, () => {
    connect(); 
    console.log("hey")
})