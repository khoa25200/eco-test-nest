import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Inject, CACHE_MANAGER } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectQueue('get-all-users')
    private getAll: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);

    // check exists
    const userInDb = await this.userRepository.findByCondition({
      email: userDto.email,
    });


    // del + update cache

    const users = await this.userRepository.findAll()
    await this.getAll.add(
      'register',
      {
        users: users,
      },
      {
        removeOnComplete: true,
      },
    );


    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const id = (await this.userRepository.findAll()).length + 1
    return await this.userRepository.create({ id, ...userDto });
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findByCondition({
      email: email,
    });

    await this.cacheManager.set('profile', user, 200);
    const userCache = await this.cacheManager.get('allUser');
    if (!userCache) {
      const users = await this.userRepository.findAll()
      await this.getAll.add(
        'register',
        {
          users: users,
        },
        {
          removeOnComplete: true,
        },
      );
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByEmail(email) {
    return await this.userRepository.findByCondition({
      email: email,
    });
  }

  async findById(id: number) {
    // Check if the provided ID is a valid positive integer

    const user = await this.userRepository.findByCondition({
      id: id,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }

  async getUserByRefresh(refresh_token, email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const is_equal = await bcrypt.compare(
      this.reverse(refresh_token),
      user.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async findOneById(id) {
    try {
      const userCache = await this.cacheManager.get('profile');
    const userCacheJson = JSON.parse(JSON.stringify(userCache));
    if (userCache) {
      if (userCacheJson.id == id) {
        return userCache;
      }
    }
    return this.findById(id);
    } catch (error) {
      throw new HttpException('cant find', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUsers() {
    try {
      const usersCache = await this.cacheManager.get('allUser');
      if (usersCache) {
        return usersCache;
      }
      const users = await this.userRepository.findAll()
      return users;
    } catch (error) {
      throw new HttpException('Unable to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
