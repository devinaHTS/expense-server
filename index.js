const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');require("dotenv").config();
const app = express();

const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get("/mail-api/v1",(req,res)=>{
    res.send(`Email server is running at port:${process.env.PORT || 3001}`)
})

app.post("/mail-api/v2", async (req, res) => {
    let { mailOptions } = req.body
    let email1 = mailOptions.from;
    let email2 = mailOptions.to;
    let subject = mailOptions.subject;
    let message = mailOptions.html;
    console.log(mailOptions, process.env.EMAIL)
    let newmail = {
        from : email1,
        to: email2,
        subject: subject,
        html: message
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
     transporter.sendMail(newmail, function(err, data) {
        if (err) {
            console.log(err)
          res.status(500).json({ success: false,message:"Internal server error", error: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "mail sent successfuly" });
        }
    });
})

app.listen(process.env.PORT || 3001, () => {
});