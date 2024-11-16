const { user } = require("../models/index");
const bcrypt = require('bcrypt');
const { SALT } = require("../config/serverConfig")

class UserRepository {
     async createUser(data) {
          try {
               const hashedPassword = await bcrypt.hash(data.password, SALT);
               data.password = hashedPassword;
               const response = await user.create(data);
               return response;
          } catch (error) {
               console.log(error);
               if (error.name === "SequelizeUniqueConstraintError") {
                    throw {
                         err: "SequelizeUniqueConstraintError",
                         message: error.errors[0].message,
                         notFound: "User not found"
                    };
               }
               // if (error.name == "UniqueConstraintError") {
               //      throw {
               //           err: "UniqueConstraintError",
               //           num: "Number already exists",
               //           message: "This username is already taken. Please use another one.",
               //           notFound: "User not found"
               //      };
               // }
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
               const response = await user.findByPk(id);
               return response;
          } catch (error) {
               console.log("Something went wrong in User repository", error);
          }
     }

     async updatePassword (id , userpassword){
          try {
               const existUser = await user.findByPk(id);
               if (!existUser) {
                    console.log("Couldn't find");
                    throw {
                         err: "AttributeNotFound",
                         message: "User not found",
                         notFound: "User not found"
                    };
               }
               else{
                    existUser.password = userpassword;
                    const updateUser = await existUser.save();

                    return updateUser;
               }
          } catch (error) {
               console.error(error);
          }
     }
}

module.exports = { UserRepository };
