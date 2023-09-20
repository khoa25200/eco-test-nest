import { BadRequestException } from "@nestjs/common";


export class Permision{
    static check(_id: any ){

        throw new BadRequestException("User can not action")
    }
}