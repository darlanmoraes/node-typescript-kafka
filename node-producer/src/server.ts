import { Server } from 'http';
import { Router } from 'express';
import { router as api } from './web/router/api';
import { properties } from './config/properties';
import * as express from 'express'
import * as http from 'http';
import * as bodyParser from 'body-parser';

const router = express.Router();
router.use('/api', api);

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.use(router);

export const server = http.createServer(app);