import app from './app';

const port = process.env.PORT || 5000;
app.listen(80, '192.168.0.111', () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
