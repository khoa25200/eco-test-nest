import { Schema, Document } from 'mongoose';

const DishSchema = new Schema(
  {
    id: Number,
    name: String,
    desc: String,
    price: Number,
    active: Boolean
  },
  {
    collection: 'dishes',
  },
);

DishSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'dish',
  justOne: false,
  // count: true,
  match: {
    categories: { $size: 2 },
  },
});

export { DishSchema };

export interface Dish extends Document {
  id: number;
  name: string;
  desc: string;
  price: number;
  active: boolean;
}
