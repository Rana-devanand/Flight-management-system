const CreateSeatsServices = require("../services/Create-seat-services");

const createSeatsServices = new CreateSeatsServices();

const create = async (req, res) => {
     try {
          const response = await createSeatsServices.createSeat(req.body);
          return res.status(200).json({
               data: response,
               message: "Seat created successfully",
               success: true,
               err: {},
          })
     } catch (error) {
          console.error(error.message);
          return res.status(500).json({
               data: {},
               message: "Failed to create the Seat",
               success: false,
               err: error,
          })
     }
}

const getseatclass = async (req, res) => {
     try {
          const response = await createSeatsServices.getSeatClass();
          return res.status(200).json({
               data : response,
               message: "Seat Class created successfully",
               success: true,
               err: {},
          })
     } catch (error) {
          console.error(error.message);
          return res.status(500).json({
               data: {},
               message: "Failed to create the Seat Class",
               success: false,
               err: error,
          })
     }
}

module.exports = {
     create,
     getseatclass
};