import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get("profile")
  async getProfile(@Req() req: any) {
    return req.user;
  }
  
  
  @UseGuards(AuthGuard())
  @Get("/getAll")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllUser(@Req() req: any) {
    return this.userService.getAllUsers();
  }
}
