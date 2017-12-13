import { service } from './web/router/api/posts/posts-service';
import { Post } from './web/router/api/posts/schema';
import { Server } from 'http';
import { Router } from 'express';
import { properties } from './config/properties';
import * as express from 'express'
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as Kafka from 'kafka-node';
import * as mongodb from 'mongodb';

const router = express.Router();

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.use(router);

const kafka = properties.kafka;

var options = {
  kafkaHost: 'kafka:9092',
  groupId: kafka.groupId,
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'latest'
};
 
var consumer = new Kafka.ConsumerGroup(options, 'POSTS');

consumer.on('message', (message) => {
  const _id = new mongodb.ObjectID();
  const post = new Post(Object.assign(JSON.parse(message.value), { _id }));
  service.create(post)
    .subscribe(
      mdata => console.log(`(${kafka.groupId}/${message.partition}) Post created: ${post._id}`),
      error => console.error(`Can't create post.`, error)
    );
});

export const server = http.createServer(app);