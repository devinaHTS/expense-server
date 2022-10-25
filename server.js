const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get("/api1",(req,res)=>{
    res.send(`Email server is rinning at port:${process.env.PORT || 3001}`)
})

app.post("/api2", async (req, res) => {
    let { mailOptions } = req.body
    let email1 = mailOptions.from;
    let email2 = mailOptions.to;
    let subject = mailOptions.subject;
    let message = mailOptions.text;
    let newmail = {
        from : email1,
        to: email2,
        subject: subject,
        text: message
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
    console.log(newmail, email1, email2, subject, message)
     transporter.sendMail(newmail, function(err, data) {
        if (err) {
          res.status(500).json({ success: false,message:"Internal server error", error: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "mail sent successfuly" });
        }
    });
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server Started!!")
});