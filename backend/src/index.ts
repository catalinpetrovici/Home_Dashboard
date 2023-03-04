import dotenv from 'dotenv';
import Logger from './log/pino';
import app from './app';
dotenv.config();

const port = process.env.PORT_SERVER || 5000;

app.listen(port, () => {
  Logger.info(`Listening: http://localhost:${port}`);
});
