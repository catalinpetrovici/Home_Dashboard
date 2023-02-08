import crypto from 'crypto';

const hashString = (password: string) =>
  crypto.createHash('md5').update(password).digest('hex');

module.exports = hashString;
