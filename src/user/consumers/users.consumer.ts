import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService,  } from '../services/user.service';
import {  Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Processor('get-all-users')
export class UserConsumer {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    ) { }

  @Process('register')
  async getUsers(job: Job<unknown>) {
    console.log(job.data);
    const time1 = new Date();

    await this.cacheManager.set('allUser', job.data, 200);

    const time2 = new Date();
    console.log('Get All Users Success: ', time2.getTime() - time1.getTime(), 'ms');
  }
}
