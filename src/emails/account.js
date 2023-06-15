const nodemailer = require("nodemailer");

const sendMail = (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: process.env.EMAIL_PORT,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const options = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html: `<h2>${message}</h2>
    <p>Have a good day! Here's an image for you: </p>
    <img src="cid:unique@gmail.com>"/>`,
    attachments: [
      {
        filename: "philly.jpg",
        path: "./src/Images/philly.jpg",
        cid: "unique@gmail.com" // Sets content ID
      }
    ]
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    else console.log("Email sent");
  });
};

const sendWelcomeEmail = (email, name) => {
  sendMail(
    email,
    "Welcome to the Task Manager App",
    `Welcome to the app ${name}! You can share your experience using the community section. Cheers!`
  );
};

const sendFarewellEmail = (email, name) => {
  sendMail(
    email,
    "Farewell",
    `We're sorry to see you go ${name}. You can share your experience using the feedback section. Farewell!`
  );
};

module.exports = {
  sendWelcomeEmail,
  sendFarewellEmail
};
