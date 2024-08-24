const { user } = require("../models/index");

class UserRepository {
     async createUser(data) {
          try {
               console.log("Repos data : ", data);
               const response = await user.create(data);
               return response;
          } catch (error) {
               console.log("Something went wrong in User repository", error);
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
