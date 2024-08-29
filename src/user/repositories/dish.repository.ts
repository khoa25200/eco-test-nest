import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Dish } from '../models/dish.model';

@Injectable()
export class DishRepository extends BaseRepository<Dish> {
  constructor(
    @InjectModel('Dish')
    private readonly dishModel: Model<Dish>,
  ) {
    super(dishModel);
  }
}
