import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const port = process.env.PORT_SERVER || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
