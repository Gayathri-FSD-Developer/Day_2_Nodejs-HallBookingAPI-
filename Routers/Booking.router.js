import express from 'express';
import { bookedHallDetails, bookedHallDetailsWithCustomer, bookingHall, createHall, customerCount } from '../Controllers/Booking.controller.js';

const router=express.Router()

// routing to varies apis using router function in express
router.post('/create-hall',createHall)
router.post('/booking-hall',bookingHall)
router.get('/getAllBookingData',bookedHallDetails)
router.get('/getCustomerBookingData',bookedHallDetailsWithCustomer)
router.get('/customerBookingCount/:name',customerCount)


export default router