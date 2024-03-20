import express from 'express';
import path from 'path';
import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

import router from './routes';

import env from '../env.json';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// logger
app.use('*', (req, res, next) => {
  //   console.log({
  //     path: req.path,
  //     method: req.method,
  //     headers: req.headers
  //   });
  next();
});

// eliminate silly routes
app.use('/favicon.ico', (req, res, next) => {
  res.status(404).send('API has no favicon!');
});

app.use('/api', router);

// 404 response
app.use('/api/*', (req, res) => {
  console.log('404');
  res.status(404).json({ err: 'nothing to see here!' });
  return;
});

// Serve my SPA for all other routes
app.get('*', (req, res, next) => {
  console.log({
    headersSent: res.headersSent,
  });
  if (res.headersSent) {
    return next();
  }

  console.log('non api');
  if (env.production) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    return;
  }

  return res.redirect(`http://127.0.0.1:${env.clientPort}`);
});

// err handling
// @ts-ignore
app.use((err, req, res, next) => {
  console.log('================================ error handler route');
  console.log(err);

  // rare case
  if (res.headersSent) {
    return next(err);
  }

  // it's safe to send err message to client in local env
  res.status(500).json({ err });
});

// Start the server
const PORT = env.serverPort || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
