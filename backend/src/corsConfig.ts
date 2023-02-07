import dotenv from 'dotenv';
dotenv.config();

// CORS CONFIG
// const whitelist = [`http://${process.env.HOST}`];
const whitelist = [
  `http://${process.env.HOST_CLIENT}:${process.env.PORT_CLIENT}`,
];

export const corsConfig = {
  // credentials: true,
  origin: function (origin: any, callback: any) {
    console.log('origin', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// app.use(function (req, res, next) {
//   req.headers.origin = req.headers.origin || `http://${req.headers.host}`;
//   next();
// });
