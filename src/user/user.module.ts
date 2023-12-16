import { Global, Module } from '@nestjs/common';
// import { Global, Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './controllers/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './consumers/users.consumer';
import * as redisStore from 'cache-manager-redis-store';
import { TimerService } from './services/telegram';
import { ScheduleModule } from '@nestjs/schedule';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'get-all-users',
    }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     // isGlobal: true,
    //     store: redisStore,
    //     host: configService.get<string>('REDIS_HOST'),
    //     port: configService.get<number>('REDIS_PORT'),
    //     username: configService.get<string>('REDIS_USERNAME'),
    //     password: configService.get<string>('REDIS_PASSWORD'),
    //   }),
    // }),
  ],
  controllers: [
    AuthController,
    UserController
  ],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    JwtStrategy,
    UserConsumer,
    TimerService
  ],
  exports: [UserService, AuthService],
})
export class UserModule {}
