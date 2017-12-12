import { properties } from './../../../../config/properties';
import { IPost } from './schema';
import { Observable } from 'rxjs';
import { Post } from './schema';
import * as Status from 'http-status-codes';

interface IService {
  create(post: IPost): Observable<IPost>;
}

class Service implements IService {
  public create = (post: IPost): Observable<IPost> => 
    Observable.fromPromise(post.save());
}

export const service = new Service();