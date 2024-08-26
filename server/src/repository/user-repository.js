const { user } = require("../models/index");

class UserRepository {
     async createUser(data) {
          try {
               console.log("Repos data : ", data);
               const response = await user.create(data);
               return response;
          } catch (error) {
               if (error.name === "SequelizeUniqueConstraintError") {
                    throw {
                         err: "UniqueConstraintError",
                         mail: "Email already exists",
                         message: "This email is already registered. Please use another one.",
                         notFound: "User not found"
                    };
               }
               if (error.name == "UniqueConstraintError") {
                    throw {
                         err: "UniqueConstraintError",
                         num: "Number already exists",
                         message: "This username is already taken. Please use another one.",
                         notFound: "User not found"
                    };
               }
               if (error.name === "SequelizeValidationError") {
                    throw {
                         err: "ValidationError",
                         message: "Validation Error",
                         errors: error.message,
                    };
               }
               // console.log("Something went wrong in User repository", error);
          }
     }


     async getAllUsers() {
          try {
               const response = await user.findAll();
               return response;
          } catch (error) {
               console.log("Something went wrong in User repository", error);
          }
     }

     async getByEmail(email) {
          try {
               console.log(email)
               const getUser = await user.findOne({
                    where: {
                         email: email
                    }
               });
               if (!getUser) {
                    throw {
                         err: "AttributeNotFound",
                         mail: "Please check the email",
                         message: "Until or unless you put not registered yet.",
                         notFound: "User not found"
                    };
               }
               return getUser;
          } catch (error) {
               console.log("Something went wrong in User repository", error);
          }
     }

     async getUserByID(id) {
          try {
               const response = await user.findByPk({
                    where: {
                         id: id
                    }
               });
               return response;
          } catch (error) {
               console.log("Something went wrong in User repository", error);
          }
     }
}

module.exports = { UserRepository };
