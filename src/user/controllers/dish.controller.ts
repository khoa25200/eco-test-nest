import { Body, Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDishDto } from '../dto/dish.dto';

@Controller('dishes')
export class DishController {
  constructor(private readonly authService: AuthService) { }

  @Get('')
  async dishes() {
    return console.log('Dishesh');
  }

  @Post('')
  async createDish(@Body() createDish: CreateDishDto) {
    return console.log('create');
  }

  @Patch(':id')
  async update(@Body() id: number) {
    return console.log('update', id);
  }

  @Delete(':id')
  async delete(@Body() id: number) {
    return console.log('delete', id);
  }

}
