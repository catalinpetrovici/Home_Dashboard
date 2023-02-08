import * as expressHandlebars from 'express-handlebars';
import { createTransport } from 'nodemailer';
import hbs = require('nodemailer-express-handlebars');
import path = require('path');

const transport: hbs.HbsTransporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'catalinpetrovici.c@gmail.com',
    pass: 'plowwmpsssggdgjr',
  },
});

const exphbs = expressHandlebars.create({
  defaultLayout: false,
  extname: '.hbs',
});

hbs({
  viewEngine: {
    defaultLayout: 'main',
    partialsDir: path.resolve('./views'),
  },
  viewPath: './views',
  extName: '.hbs',
});

const plugin = hbs({
  viewEngine: exphbs,
  viewPath: './views',
});

// Step 2
transport.use('compile', plugin);

// Step 3
const mailOptions = {
  from: 'catalinpetrovici.c@gmail.com', // TODO: email sender
  to: 'petrovicicatalin24@yahoo.com', // TODO: email receiver
  subject: 'Nodemailer - Test',
  text: 'Wooohooo it works!!',
  template: 'verificationEmail',
  context: {
    name: 'Macarena',
    email: 'Macarena@yahoo.com',
    verificationLink: '',
  }, // send extra values to template
};

// Step 4
transport.sendMail(mailOptions, (err, data) => {
  if (err) {
    return console.log('Error occurs', err);
  }
  return console.log('Email sent!!!');
});
