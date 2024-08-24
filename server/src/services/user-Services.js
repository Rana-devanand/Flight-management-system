const { UserRepository } = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
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

     async signIn(email, plainPassword) {
          try {
               // Sign in logic goes here

               // Step 1: Fetch the user to using email;
               const user = await this.UserRepository.getByEmail(email);

               // Step 2: Check if the user exists then match the password;
               const passwordMatch = this.passwordAuthentication(
                    plainPassword,
                    user.password,
               )

               // if Password Does Not match ;
               if (!passwordMatch) {
                    throw { error: 'Password does not match' }
               }

               // if password does match then create the Token and send to the User.
               // Create JWT Token
               let newJWT = this.createToken(
                    {
                         email: user.email,
                         id: user.id,
                         username: user.username,
                    }
               )
               return newJWT;
          } catch (error) {
               console.log("Something went wrong in service", error);
          }
     }

     passwordAuthentication(userPlainPassword, encryptedPassword) {
          try {
               return bcrypt.compareSync(userPlainPassword, encryptedPassword);
          } catch (error) {
               console.log("Something went wrong in Password Authentication", error);
          }
     }

     // 900 = 15min timeout
     createToken(user) {
          try {
               let obj = {
                    token: jwt.sign(user, JWT_KEY, { expiresIn: 900 }),
                    user: {
                         id: user.id,
                         email: user.email,
                         username: user.username,
                    }
               }
               return obj;
          } catch (error) {
               console.log("Something went wrong in Token creation", error);
          }
     }
}

module.exports = { UserServices };