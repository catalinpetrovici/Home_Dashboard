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

const sendEmailHandlebars = async ({
  email,
  subject,
  firstName,
  verificationLink,
  templateEmail,
}: {
  email: string;
  subject: string;
  firstName: string;
  verificationLink: string;
  templateEmail: string;
}) => {
  transport.use('compile', plugin);

  return transport.sendMail(
    {
      from: 'catalinpetrovici.c@gmail.com',
      to: email,
      subject: subject,
      template: templateEmail,
      context: {
        firstName,
        email,
        verificationLink,
      }, // send extra values to template
    },
    (err, data) => {
      if (err) {
        return console.log('Error occurs', err);
      }
      return console.log('Email sent!!!');
    }
  );
};

export default sendEmailHandlebars;
