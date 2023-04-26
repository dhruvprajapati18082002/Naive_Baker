const nodemailer = require("nodemailer");

require('dotenv').config();

async function sendOTP(email,otp) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'naivebaker1234@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Reset Naive Baker Password", // Subject line
        text: `Your OTP to reset your password is ${otp}`
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//main("u20cs026@coed.svnit.ac.in","hello");
module.exports = sendOTP;
