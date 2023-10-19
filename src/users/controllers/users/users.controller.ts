import {
  Body,
  Controller,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { UsersService } from 'src/users/services/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @MessagePattern({ cmd: 'getUsers' })
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Body() uuid: any): Promise<User> {
    return this.userService.findUsersById(uuid['uuid']);
  }

  @MessagePattern({ cmd: 'createOrUpdate' })
  createUser(@Body() createuser: CreateUserDto): Promise<any> {
    return this.userService.createOrUpdateUser(createuser['user']);
  }

  @MessagePattern({ cmd: 'checkUsername' })
  checkUsername(@Body() username: any): Promise<any> {
    return this.userService.checkUsername(username['username']);
  }

  @MessagePattern({ cmd: 'authenticate' })
  signIn(credentials): Promise<any> {
    return this.userService.findUserByCredentials(credentials.username, credentials.password);
  }

  @MessagePattern({ cmd: 'authenticateAD' })
  signInWithAD(@Body() email: string): Promise<any> {
    return this.userService.authenticateByAD(email['email'])
  }



}
