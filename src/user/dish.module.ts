import { Global, Module } from '@nestjs/common';
// import { Global, Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { TimerService } from './services/telegram';
import { ScheduleModule } from '@nestjs/schedule';
import { DishController } from './controllers/dish.controller';
import { DishSchema } from './models/dish.model';
import { DishRepository } from './repositories/dish.repository';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Dish',
        schema: DishSchema,
      },
    ])
  ],

  controllers: [
    DishController
  ],
  providers: [
    DishRepository,
  ],
  exports: [],
})
export class DishModule { }
