// import controller from '../controller';
import { Router } from 'express';
const router = Router();

/*
  authenticate
  dbs
  tables
  table (pagination) + profile
*/

router.get('/welcome', (req, res, next) => {
  console.log('welcome');
  return res.json({ msg: 'welcome' });
});

router.get('/bye', (req, res, next) => {
  console.log('bye');
  return res.json({ msg: 'bye' });
});

export default router;
