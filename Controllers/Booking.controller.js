const room_details = [
    {
        room_id: 1,
        room_name: "Big hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c",
        seats: 500,
        Rent_per_hour: 4000,
    },
    {
        room_id: 2,
        room_name: "Medium hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c",
        seats: 300,
        Rent_per_hour: 2000,
    },
    {
        room_id: 3,
        room_name: "premium hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c",
        seats: 200,
        Rent_per_hour: 5000,
    },
    {
        room_id: 4,
        room_name: "Small hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c",
        seats: 100,
        Rent_per_hour: 1000,
    },
    {
        room_id: 5,
        room_name: "Premium Big hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c",
        seats: 500,
        Rent_per_hour: 8000,
    },
    {
        room_id: 6,
        room_name: "VIP hall",
        room_status: "available",
        amenities: "Tv,fridge,iron,A/c,sauna room,steam room",
        seats: 500,
        Rent_per_hour: 4000,
    },
];

const BookingData = [];

// Create Hall Api(for owner)
export const createHall = async (req, res) => {
    try {
        const { room_name, room_status, amenities, seats, Rent_per_hour } =
            req.body;
        const newHall = {
            room_id: room_details.length + 1,
            room_name: room_name,
            room_status: room_status,
            amenities: amenities,
            seats: seats,
            Rent_per_hour: Rent_per_hour,
        };
        room_details.push(newHall);
        await res.status(200).json({
            message: "New Hall added successfully",
            data: newHall,
        });
    } catch (error) {
        res.status(500).json({ Error: "Internal Server Error" });
    }
};

// Booking Hall (Clientside)
export const bookingHall = (req, res) => {
    const { customer_name, date, start_time, end_time, room_id, room_name } =
        req.body;

    // To check the room status
    let roomAvailablility = room_details.find(
        (item) => item.room_id == room_id && item.room_status == "available"
    );
    if (!roomAvailablility) {
        res
            .status(400)
            .json({
                message:
                    "Currently this room is not available, Kindly check for another room",
            });
    } else {
        // To ensure the room available for specific date that client wants to book
        let dateAvailability = BookingData.filter(
            (item) => item.Booking_Date == date && item.Room_id == room_id
        );
        if (dateAvailability.length > 0) {
            res
                .status(400)
                .json({
                    message: "Currently this room is not available for this Date",
                });
        } else {
            let newHallBooking = {
                Booking_id: BookingData.length + 1,
                Room_id: room_id,
                Room_name: room_name,
                Booking_Date: date,
                Customer_name: customer_name,
                Start_time: start_time,
                End_time: end_time,
                Date: date,
                Status: "booked",
            };

            BookingData.push(newHallBooking);
            res
                .status(200)
                .json({
                    message: "Hall booked successfully, Please find the details",
                    BookingDetails: newHallBooking,
                });
        }
    }
};

// List all BookingHall Details
export const bookedHallDetails = async (req, res) => {
    try {
        // await res.status(200).json({message:"Booked Halls Details fetched successfully",BookingData})
        if (BookingData.length == 0) {
            res
                .status(404)
                .send("BookingData is empty, please book the room in booking api");
        }
        let allRooms = BookingData.map((rooms) => {
            let roomDetails = room_details.find(
                (item) => item.room_id == rooms.Room_id
            );
            // console.log(roomDetails,"lll");
            return {
                Room_Name: roomDetails.room_name,
                Booked_Status: rooms.Status,
                Customer_Name: rooms.Customer_name,
                Date: rooms.Booking_Date,
                Start_Time: rooms.Start_time,
                End_Time: rooms.End_time,
            };
        });
        await res
            .status(200)
            .json({
                message: "All rooms with Booking Details Fetched Successfully",
                data: allRooms
            });
    } catch (error) {
        await res.status(500).send("Internal Server Error");
    }
};

// List all customers with booking detils
export const bookedHallDetailsWithCustomer = async (req,res) => {
    try {
        if (BookingData.length == 0) {
            res.status(404)
                .send("BookingData is empty, please book the room in booking api");
        }
        let allRooms = BookingData.map((rooms) => {
            let roomDetails = room_details.find(
                (item) => item.room_id == rooms.Room_id
            )
            // console.log(roomDetails);
            return {
                Room_Name: roomDetails.room_name,
                Customer_Name: rooms.Customer_name,
                Date: rooms.Booking_Date,
                Start_Time: rooms.Start_time,
                End_Time: rooms.End_time,
            }
        })
        await res.status(200).json({message:"All Booked Hall Customer Details Fetched Successfully",allRooms})
    } 
    catch (error) {
        // console.log(error);
        await res.status(500).send("Internal Server Error")
    }
}

// List how many times a customer has booked the room
export const customerCount =async(req,res)=>{
    try{
        let customer_name = req.params.name;
        console.log(customer_name,"hi")

        if (BookingData.length == 0) {
            res.status(404)
                .send("BookingData is empty, please book the room in booking api");
        }
        let noCustomer = BookingData.find((cust)=>cust.Customer_name==customer_name)
        if(!noCustomer)
        {
            res.status(404)
                .send("Customer not found");
        }
        // find the booking count of customer
        let customerCount= BookingData.filter(ele=>ele.Customer_name==customer_name) 
        
        res.status(200).json({message:"Successfully fetched Customer count with Details",
        Booking_count:customerCount.length, Customer_details:customerCount})
      
    }
    catch(error){

        await res.status(500).send("Internal Server Error")
    }
}
