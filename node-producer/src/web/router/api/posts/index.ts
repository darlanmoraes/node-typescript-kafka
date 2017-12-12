import { properties } from './../../../../config/properties';
import { Observable } from 'rxjs';
import { Promise } from 'bluebird';
import { Post, IPost } from './schema';
import { service } from './posts-service';
import * as express from 'express';
import * as Status from 'http-status-codes';

export const router = express.Router();

router.post('/', (req, res, next) => {
  const post = new Post(req.body);
  service.stream(post)
    .subscribe(
      kdata => res.sendStatus(Status.CREATED),
      error => res.sendStatus(Status.INTERNAL_SERVER_ERROR)
    );
});