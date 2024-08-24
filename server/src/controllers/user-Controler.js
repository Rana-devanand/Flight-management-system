const { UserServices } = require("../services/user-Services")

const userServices = new UserServices();
const create = async (req, res) => {

     try {
          const response = await userServices.createUser(req.body);
          return res.status(200).json({
               data: response,
               message: "User created successfully",
               success: true,
               error: {},
          });
     } catch (error) {
          console.error("An error occurred while creating the user", error);
          return res.status(500).json({
               data: {},
               message: "Failed to create the user",
               success: false,
               error: error,
          })
     }

}

module.exports = {
     create,
}