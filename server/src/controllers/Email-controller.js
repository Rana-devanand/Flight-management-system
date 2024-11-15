const transporter = require("../config/emailConfig")
const { UserServices } = require("../services/user-Services");

const userServices = new UserServices();

const sendEmailForPasswordForget = async (req, res) => {
     const recipient = req.body.email;
     const response = await userServices.getUserEmail(recipient);
     if(response){
          const otp = Math.floor(1000 + Math.random() * 9000);
          console.log(otp);
     transporter.sendMail({
          from: 'sender@gmail.com',
          to: recipient,
          subject: 'Password Reset',
          text: 'Hello, please click on the following link to reset your password: http://localhost:3000/reset-password/token-here',
          html : `<h1>Hello, User...</h1> 
          <h4><b>
          Enter your OTP = ${otp} </br>
          </h4><b>`,
     }, (error, info) => {
          if (error) {
            return console.error("Error sending email:", error);
          }
          return res.status(200).json({
               data: response,
               otp : otp,
               message: "Email sent successfully",
               success: true,
               error: null,
          })
        });
     }
     else{
          return res.status(203).json({
              data: {},
              message: "User not found with given email",
              success: false,
              error: null,
          })
     }
}

module.exports = {
     sendEmailForPasswordForget
};