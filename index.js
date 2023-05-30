const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const app = express();

const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());

app.post("/mail-api/v2", async (req, res) => {
    let { mailOptions } = req.body
    const newmail = {
        ...mailOptions,
        from : process.env.EMAIL
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD 
        }
    })
     transporter.sendMail(newmail, function(err, data) {
        if (err) {
            console.log(err)
          res.status(500).json({ success: false,message:"Internal server error", error: err });
        } else {
          res
            .status(200)
            .json({ success: true, message: "mail sent successfuly" });
        }
    });
})

app.listen(process.env.PORT || 3001, () => {
});