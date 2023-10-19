import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { Subscription, User } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
  ) { }

  async createOrUpdate(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      const createSubscription = await this.subscriptionRepository.create(createSubscriptionDto)
      const newSubscription = await this.subscriptionRepository.save(createSubscription)
      if (newSubscription.id) {
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

  findAll() {
    return this.subscriptionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  findByUser(userId: any) {
    return this.subscriptionRepository.createQueryBuilder('subscriptions')
      .leftJoinAndSelect('subscriptions.user', 'user')
      .where('subscriptions.userId = :userId', { userId })
      .getOne()
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkSubscriptionsStatus() {
    const subsInactive = await this.subscriptionRepository.find({ where: { is_active: false }, relations: ['user'] });
    for (const user in subsInactive) {
      console.log(user)
    }

  }
}
