const transporter = require("../config/emailConfig")

const sendEmailForPasswordForget = (req, res) => {
     const recipient = req.body.email;
     console.log(recipient);
     transporter.sendMail({
          from: 'sender@gmail.com',
          to: recipient,
          subject: 'Password Reset',
          text: 'Hello, please click on the following link to reset your password: http://localhost:3000/reset-password/token-here',
          html : 'Hello, please click on the following link to reset your password: http://localhost:3000/reset-password/token-here',
     }, (error, info) => {
          if (error) {
            return console.error("Error sending email:", error);
          }
          console.log("Message sent:", info.messageId);
        });
}

module.exports = {
     sendEmailForPasswordForget
};