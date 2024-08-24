const { UserRepository } = require("../repository/user-repository");

class UserServices {
     constructor() {
          this.UserRepository = new UserRepository();
     }

     async createUser(data) {
          console.log("Service data :", data);
          try {
               const user = await this.UserRepository.createUser(data);
               return user;
          } catch (error) {
               console.log("Something went wrong in service", error);
          }
     }

     async getUser() {
          try {
               const allUsers = await this.UserRepository.getAllUsers();
               return allUsers;
          } catch (error) {
               console.log("Something went wrong in service", error);
          }
     }

}

module.exports = { UserServices };