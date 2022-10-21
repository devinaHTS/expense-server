const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.send(`Email server is rinning at port:${process.env.PORT || 3001}`)
})

app.post("/", cors(), async (req, res) => {
    let { mailOptions } = req.body
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
    console.log(mailOptions)
    await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          res.status(500).json({ success: false, message: err.message, dataRecieved:req.body, env:process.env });
        } else {
          console.log("Email Sent!!!");
          res
            .status(200)
            .json({ success: true, message: "mail sent successfuly" });
        }
    });
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server Started!!")
});