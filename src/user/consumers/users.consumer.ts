import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService } from '../services/user.service';


@Processor('get-all-users')
export class UserConsumer {
  constructor(private userService: UserService) {}

  @Process('login')
  async getUsers(job: Job<unknown>) {
    console.log(job.data);
    const time1 = new Date();
    await this.userService.getAllUsers()
    const time2 = new Date();
    console.log('Get All Users Success: ', time2.getTime() - time1.getTime(), 'ms');
  }
}
