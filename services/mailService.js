const nodemailer =  require('nodemailer');

module.exports = {
  sendMail: (informTo, subject, text, html) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'theriverhotelsystem@gmail.com',
        pass: '123123haule24hdev'
    }
    });
    transporter
      .sendMail({
        from: 'The River Hotel',
        to: informTo ,
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
      })
      .then(response => {
        console.log(response);
        console.log("Message sent: %s", response.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
      })
      .catch(console.error);
  }
}
  
