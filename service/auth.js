"use strict";
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// hash password using bcrypt
async function hashPassword(password) {
    console.log('hashing password', password)
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

// authenticate user using bcrypt
async function comparePassword(password, hashPassword) {
    const comparePassword = await bcrypt.compare(password, hashPassword);
    return comparePassword;
}

// send reset email 
async function sendEmail(email) {
    console.log('in sendEmail', email)
    let testAccount = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let token = jwt.sign({ username: email }, 'alertwatch', { expiresIn: '1h' });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <footest@example.com>', // sender address
        to: "iadiabagate95@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Lets resit your email", // plain text body
        html: `<b>Click link to reset?</b> <a href="http://localhost:3000/passwordreset?user=${email}&token=${token}" >http://localhost:3000/passwordreset?user=${email}&token=${token}</a>`, // html body
      });


      console.log("Message sent: %s", info);
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = { hashPassword, comparePassword, sendEmail };