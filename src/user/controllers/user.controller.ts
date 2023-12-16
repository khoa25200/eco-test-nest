import {  Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Req, UseGuards } from "@nestjs/common";
// import { CACHE_MANAGER, Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";

import { Cache } from 'cache-manager';
import { RolesGuard } from "src/guards/roles.guard";
import { HasRoles } from "src/guards/has-roles.decorator";
import { Role } from "../enums/role.enum";
import { Cron, CronExpression } from "@nestjs/schedule";
import { TimerService } from "../services/telegram";
@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    return this.userService.getAllUsers();
  }


  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron() {
    console.log("cron job")
    TimerService.sendToTelegram(`BACKEND-CONSUMER-DR-42-22_TEST getProductsByShowcase getProductDetailsByShowcaseParam {"agent_ref":"0372779917","limit":9,"page":1,"is_filter":false,"org_types":["RETAILER"],"channel":"CONSUMER","request_status":[2,4],"data":{"all":[{"fact":"CATEGORY","value":[464],"path":"category.ids","operator":"contains"}]},"type":3,"location":{"lng":106.658337,"lat":10.794317},"radius":2,"province_name":"Thành phố Hồ Chí Minh","is_filter_location":false,"fixed_skus":[],"partner_code":"TITKUL"} 0372779917 1701664255335 take 8817`, -4089535163)

    setTimeout(() => {
      TimerService.sendToTelegram(`
      LOGGER Unhandled Rejection /queue/CONSUMER_TELEGRAM_BOT_BACKEND-CONSUMER-DR-42-22_TEST " Error\n    at PartnerRfService.<anonymous> (/app/application/finviet/eco-consumer/dist/appsqc/consumers/main.js:7768:23)\n    at Generator.throw (<anonymous>)\n    at rejected (/app/application/finviet/eco-consumer/node_modules/tslib/tslib.js:115:69)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)"`, -4089535163)
    }, 200000)
  }


  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron2() {
    console.log("cron job")
    TimerService.sendToTelegram(`BACKEND-CONSUMER-DR-42-22_TEST getProductsByShowcase getProductDetailsByShowcaseParam {"agent_ref":"0372779917","limit":9,"page":1,"is_filter":false,"org_types":["RETAILER"],"channel":"CONSUMER","request_status":[2,4],"data":{"all":[{"fact":"CATEGORY","value":[464],"path":"category.ids","operator":"contains"}]},"type":3,"location":{"lng":106.658337,"lat":10.794317},"radius":2,"province_name":"Thành phố Hồ Chí Minh","is_filter_location":false,"fixed_skus":[],"partner_code":"TITKUL"} 0372779917 1701664255335 take 8817`, -4089535163)

    setTimeout(() => {
      TimerService.sendToTelegram(`
      LOGGER Unhandled Rejection /queue/CONSUMER_TELEGRAM_BOT_BACKEND-CONSUMER-DR-42-22_TEST " Error\n    at PartnerRfService.<anonymous> (/app/application/finviet/eco-consumer/dist/appsqc/consumers/main.js:7768:23)\n    at Generator.throw (<anonymous>)\n    at rejected (/app/application/finviet/eco-consumer/node_modules/tslib/tslib.js:115:69)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)"`, -4089535163)
    }, 20000)
  }
}


