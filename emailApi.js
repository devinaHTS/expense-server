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

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// var sendMail = require('./emailApi');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// app.use(cors())

// app.get("/mail-api/v1",(req,res)=>{
//     res.send(`Email server is rinning at port:${process.env.PORT || 3001}`)
// })

// app.post("/mail-api/v2", async (req, res) => {
//     let { mailOptions } = req.body
//     let err = sendMail(mailOptions, res)    
// })

// app.listen(process.env.PORT || 3001, () => {
// });

