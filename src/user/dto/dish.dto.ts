import { IsNotEmpty } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() desc: string;
  @IsNotEmpty() price: number;
  @IsNotEmpty() active: boolean;
}
