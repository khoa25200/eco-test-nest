import { CACHE_MANAGER, Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";

import { Cache } from 'cache-manager';
import { RolesGuard } from "src/guards/roles.guard";
import { HasRoles } from "src/guards/has-roles.decorator";
import { Role } from "../enums/role.enum";
@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard())
  @Get("profile")
  async getProfile(@Req() req: any) {
    return req.user;
  }

  // only admin can get all
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get("/getAll")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllUser(@Req() req: any) {
    const usersCache = await this.cacheManager.get('allUser');
    if (usersCache) {
      return usersCache;
    }
    return this.userService.getAllUsers();
  }


  // cache redis
  @Get('demo/set-cache')
  async demoSetCache() {
    await this.cacheManager.set('testcache', 'hello world', 10);
    return true;
  }

  @Get('demo/get-cache')
  async demoGetCache() {
    return this.cacheManager.get('testcache');
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  // return this.userService.findById(id);

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userCache = await this.cacheManager.get('profile');
    const userCacheJson = JSON.parse(JSON.stringify(userCache));
    if (userCache) {
      if (userCacheJson.id == id) {
        return userCache;
      }
    }
    return this.userService.findById(id);
  }
}


