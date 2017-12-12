import { Document, Schema, Model, model} from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
  json(): IPost;
}

export const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}, {
  timestamps: true
});

PostSchema.methods.json = function(): IPost {
  return Object.assign({}, { ...this.toObject() });
};

export const Post: Model<IPost> = model<IPost>('Post', PostSchema);