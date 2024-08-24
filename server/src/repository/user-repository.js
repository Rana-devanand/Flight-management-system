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
}

module.exports = { UserRepository };
