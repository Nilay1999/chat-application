var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "user@gmail.com",
        pass: "user123",
    },
});

var mailOptions = {
    from: "nilayparmar19@gmail.com",
    to: "nilayparmar51@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});
