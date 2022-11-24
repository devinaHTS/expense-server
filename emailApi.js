const nodemailer = require('nodemailer');
require("dotenv").config();

module.exports =  (mailOptions, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
    transporter.sendMail(mailOptions, function(err, data) {
        console.log(err)
        if (err) {
            console.log(err)
            res.status(500).json({ success: false,message:"Internal server error", error: err.message });
        } else {
            res.status(200).json({ success: true, message: "mail sent successfuly" });
        }
    });
}

