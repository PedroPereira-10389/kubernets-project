import {
    Body,
    Controller,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Role } from 'src/typeorm';
import { RolesService } from 'src/users/services/roles/roles.service';

@Controller()
export class RolesController {
    constructor(private readonly roleService: RolesService) { }

    @MessagePattern({ cmd: 'getRoles' })
    getRoles(): Promise<Role[]> {
        return this.roleService.findAll();
    }
}