import rateLimit from 'express-rate-limit';

const allowlist = ['192.168.0.56', '192.168.0.21'];

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Exceed api calls, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // skip: (request, response) => allowlist.includes(request.ip),
});

const accountLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
    'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // handler: (request, response, next, options) =>
  // 	response.status(options.statusCode).send(options.message),
});

export default { apiLimiter, accountLimiter };
