const nodemailer = require('nodemailer');

module.exports = async (event) => {
  const { data } = event;
  console.log(`New Avenger created: ${data.name}`, data);

  const account = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const subject = 'A new Avenger';
  const message = `A new avenger called ${
    data.name
  } just joined the team. Check it out`;

  const info = await transporter.sendMail({
    from: 'Sender Name <sender@example.com>', // your address
    to: 'Friends <friends@example.com>', // list of friends
    subject, // Subject line
    text: message, // plain text body
  });

  console.log('Email notification sent', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return {
    data: event.data,
  };
};
