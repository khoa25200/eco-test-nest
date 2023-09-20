import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService } from '../services/user.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Processor('get-all-users')
export class UserConsumer {
  constructor(private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    ) { }

  @Process('login')
  async getUsers(job: Job<unknown>) {
    console.log(job.data);
    const time1 = new Date();

    // Get All Users and Set Cache
    const allUser = await this.userService.getAllUsers()
    await this.cacheManager.set('allUser', allUser, 5);

    const time2 = new Date();
    console.log('Get All Users Success: ', time2.getTime() - time1.getTime(), 'ms');
  }
}
