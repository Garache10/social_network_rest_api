import { model, Schema } from 'mongoose';

const post_stat_schema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  }
);

export default model('PostStat', post_stat_schema);
