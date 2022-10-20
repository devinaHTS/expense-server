require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log("Email Sent!!");
    } catch (error) {
        console.log("ERRzo!!");
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

sendMail({
    to: "swetha.vijay@hutechsolutions.com",
    from: "hutechhr@gmail.com",
    subject: "Leave Request",
    text: "Test Email!!"
});