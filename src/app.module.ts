import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";

import { BullModule } from "@nestjs/bull";
import { EventGateway } from "./event.gateway";
import { UserModule } from "./user/user.module";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UserModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          username: config.get('REDIS_USERNAME'),
          password: config.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    EventGateway,
  ],
})
export class AppModule {}
