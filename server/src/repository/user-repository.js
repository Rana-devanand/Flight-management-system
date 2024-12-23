const { user } = require("../models/index");
const bcrypt = require('bcrypt');
const { SALT } = require("../config/serverConfig")

class UserRepository {
     async createUser(data) {
          try {
               // const hashedPassword = await bcrypt.hash(data.password, SALT);
               // data.password = hashedPassword;
               const response = await user.create(data);
               return response;
          } catch (error) {
               console.error("repository error :" , error);
               return {error};
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
                         message: "Until or unless you put email not registered yet.",
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

     async updatePassword (userid , newPassword){
          try {
               const existUser = await user.findByPk(userid);
               if (!existUser) {
                    console.log("Couldn't find");
                    throw {
                         err: "AttributeNotFound",
                         message: "Email not found",
                         notFound: "User not found"
                    };
               }
               else{
                   existUser.password = newPassword;
                   const updateUser = await existUser.save();
               //     console.log("Updated User : " , updateUser);
                   return updateUser;
               }
          } catch (error) {
               console.error(error);
          }
     }
}

module.exports = { UserRepository };
