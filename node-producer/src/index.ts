import { Promise } from 'bluebird';
import * as mongoose from 'mongoose';
import { server } from './server';
import { properties } from './config/properties';

function connect() {
  (<any> mongoose).Promise = Promise;
  mongoose.connect(properties.mongo.url, { useMongoClient: true });
  mongoose.connection.once('open', function() {
    console.log(`Mongo on: ${properties.mongo.url}`);
  });
};

export const listen = () => {
  server.listen(properties.server.port, () => {
    console.log(`Server on: http://localhost:${properties.server.port}`);
    connect();
  });
};

listen();