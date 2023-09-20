import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/enums/role.enum';


export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);