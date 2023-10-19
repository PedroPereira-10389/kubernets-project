import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription, User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from './jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionsService } from 'src/subscriptions/services/subscriptions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, private readonly tokenService: TokenService,
    private readonly subscriptionService: SubscriptionsService
  ) { }

  async createOrUpdateUser(createUserDto: CreateUserDto) {
    /* must instantiate the user becausase without that the trigger don't run*/
    try {
      const newUser = await this.userRepository.create(createUserDto)
      newUser.role = createUserDto['roleId']
      const user = await this.userRepository.save(newUser)
      let newSubscription = await this.subscriptionService.findByUser(user.id)
      if (!newSubscription) {
        newSubscription = new Subscription()
      }
      newSubscription.type = createUserDto['subscriptionId']
      newSubscription.user = user
      const subscription = await this.subscriptionService.createOrUpdate(newSubscription)
      if (user.id && subscription['status'] == HttpStatus.OK) {
        return { status: 200, message: "User created successfully" }
      }
    } catch (error) {
      throw new HttpException({
        status: error.HttpStatus,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    };
  }

  async checkUsername(username: string) {
    const userName = await this.userRepository.findOne({ where: { username: username } });
    let results = {}
    if (userName) {
      results = { status: 200, message: true }
    } else {
      results = { status: 200, message: false }
    }

    return results

  }

  findUsersById(uuid: string): Promise<User> {
    return this.userRepository.findOne({
      where: { uuid: uuid },
      relations: ['role', 'subscription', 'subscription.type'],
      select: ['id', 'name', 'last_name', 'username', 'enterprise', 'role', 'uuid', 'email']
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('users')
      .leftJoinAndSelect('users.subscription', 'subscription')
      .leftJoinAndSelect('subscription.type', 'type')
      .getMany();
  }

  async findUserByCredentials(username: string, password: string): Promise<any> {
    const user = await this.userRepository.createQueryBuilder('users')
      .innerJoinAndSelect('users.role', 'roles')
      .where('users.username = :username and users.is_active=true', { username })
      .getOne()

    if (user) {
      if (await bcrypt.compare(password, user?.password)) {
        const access_token = await this.tokenService.getToken({ sub: user.id, username: username });
        return {
          status: HttpStatus.OK,
          message: { access_token: access_token, user: { id: user?.uuid, name: user?.username, email: user?.email, access_token: access_token, role: user.role.name } }
        }
      }
    }

    return {
      status: HttpStatus.UNAUTHORIZED,
      message: "Please verify your credentials"
    }
  }

  async authenticateByAD(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      let uuidgenerate = uuidv4();
      const salt = await bcrypt.genSalt();
      const createUserNew = new CreateUserDto();
      createUserNew.email = email;
      createUserNew.username = "userAD" + uuidgenerate;
      createUserNew.password = await bcrypt.hash(createUserNew.username, salt);
      await this.createOrUpdateUser(createUserNew);
    }

    return {
      status: HttpStatus.OK,
      message: { access_token: await this.tokenService.getToken({ sub: user.id, username: user.username }) }
    }
  }
}
