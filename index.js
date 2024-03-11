import express from 'express';    
import bookingRouter from'./Routers/Booking.router.js'

const app=express();
const PORT=4000;
// To use payload (json)data that comes from frontend
app.use(express.json())

// Home call
app.get('/',(req,res)=>{
res.status(200).send(` <div style="background-color:rgb(94, 159, 135);text-align: center;border-radius: 25px;"><h1>
Server Connected Successfully🌐
</h1>
</div>
<div style="background-color: #41a0a0; border-radius: 25px;text-align: center;">
<br>
<h2>Please check the below API's🖥</h2>

//    📝 <a href="http://localhost:4000/hallbooking/create-hall">API to Create new hall(postman hit with required data)✍</a><br>
//    <br>
//    📝 <a href="http://localhost:4000/hallbooking/booking-hall">API to Book the hall(postman hit with required data)</a><br>
//    <br>🧾<a href="http://localhost:4000/hallbooking/getAllBookingData">API to getall the bookings</a><br>
//   <br> 🧾<a href="http://localhost:4000/hallbooking/getCustomerBookingData">API to getall booking with customer data👉</a><br>
//   <br> 🧾<a href="http://localhost:4000/hallbooking/customerBookingCount/:name">API to count the booking👉(postman hit with required data)</a>
//   <br><br>
   📝 <a href="https://day-2-nodejs-hallbookingapi.onrender.com/hallbooking/create-hall">API to Create new hall(postman hit with required data)✍</a><br>
   <br>
   📝 <a href="https://day-2-nodejs-hallbookingapi.onrender.com/hallbooking/booking-hall">API to Book the hall(postman hit with required data)</a><br>
   <br>🧾<a href="https://day-2-nodejs-hallbookingapi.onrender.com/hallbooking/getAllBookingData">API to getall the bookings</a><br>
  <br> 🧾<a href="https://day-2-nodejs-hallbookingapi.onrender.com/hallbooking/getCustomerBookingData">API to getall booking with customer data👉</a><br>
  <br> 🧾<a href="https://day-2-nodejs-hallbookingapi.onrender.com/hallbooking/customerBookingCount/:name">API to count the booking👉(postman hit with required data)</a>
  <br><br>

  <h3>Please explore api documentation to hit the above APIs </h3>
 🧾<a href="https://documenter.getpostman.com/view/14958136/2sA2xiWXWw">"API Documentaion Link"</a>

</div>`);
})

// baseurl
app.use('/hallbooking',bookingRouter)


app.listen(PORT,()=>{
    console.log("Server Connected successfully",PORT);
})