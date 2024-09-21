const { UserServices } = require("../services/user-Services");

const userServices = new UserServices();

// http://localhost:3000/api/V1/createUser
const create = async (req, res) => {
     try {
          const response = await userServices.createUser(req.body);
          return res.status(201).json({
               data: response,
               message: "User created successfully",
               success: true,
               error: {},
          });
     } catch (error) {
          console.log("An error occurred while creating the user", error);
          return res.status(500).json({
               data: {},
               message: "Failed to create the user",
               success: false,
               error: error,
          });
     }
};

// http://localhost:3000/api/V1/users
const get = async (req, res) => {
     try {
          const response = await userServices.getUser(req.body);
          return res.status(200).json({
               data: response,
               message: "User fetched successfully",
               success: true,
               error: {},
          })
     } catch (error) {
          console.error("An error occurred while fetching the user", error);
          res.status(500).json({
               data: {},
               message: "Failed to fetch the user",
               success: false,
               error: error,
          })
     }
}

const getByEmail = async (req, res) => {
     try {
          // console.log(req.params.email)
          const response = await userServices.getUserEmail(req.params.email)
          return res.status(200).json({
               data: response,
               message: "User fetched successfully",
               success: true,
               error: {},
          })
     } catch (error) {
          console.log("An error occurred while fetching user information from email", error);
          return res.status(500).json({
               data: {},
               message: "Failed to fetch user information from email",
               success: false,
               error: error,
          })
     }
}

const signIn = async (req, res) => {
     try {
          console.log("Body data: ", req.body)
          const response = await userServices.signIn(
               req.body.email,
               req.body.password
          )
          return res.status(200).json({
               data: response,
               message: "User signed in successfully",
               success: true,
               error: {},
          })
     } catch (error) {
          return res.status(500).json({
               data: {},
               message: "Failed to sign in the user",
               success: false,
               error: error,
          })
     }

}

module.exports = {
     create,
     get,
     signIn,
     getByEmail
};
