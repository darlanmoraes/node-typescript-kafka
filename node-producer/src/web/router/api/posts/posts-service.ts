import { properties } from './../../../../config/properties';
import { IPost } from './schema';
import { Observable } from 'rxjs';
import { Post } from './schema';
import * as Status from 'http-status-codes';
import * as Kafka from 'kafka-node';

const client = new Kafka.KafkaClient({ kafkaHost: properties.kafka.url });
const producer = new Kafka.Producer(client);

producer.on('ready', () => {
  console.log('Kafka producer ready to receive data.');
});

interface IService {
  stream(post: IPost): Observable<IPost>;
}

class Service implements IService {
  public stream(post: IPost): Observable<IPost> { 
    return Observable.create(observer => {
      const partition = Math.floor(Math.random() * 4) + 0 ;
      const messages = JSON.stringify(post);
      const topic = 'POSTS';
      const payload = [ { topic, messages , partition } ];
      producer.send(payload, (error, data) => {
        if (error) observer.error(error);
        else observer.next(data);
        observer.complete();
      });
    });
  };
}

export const service = new Service();