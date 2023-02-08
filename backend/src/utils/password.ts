import bcrypt from 'bcryptjs';

const generatePassword = async function (userPassword: string) {
  const salt = await bcrypt.genSalt(13);
  return await bcrypt.hash(userPassword, salt);
};

const comparePassword = async function (
  userPassword: string,
  databasePassword: string
) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(userPassword, databasePassword, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export { comparePassword, generatePassword };
