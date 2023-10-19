

import { User } from "../users/entities/user.entity";
import { Survey } from "../surveys/entities/survey.entity";
import { Question } from "src/surveys/entities/question.entity";
import { Option } from "src/surveys/entities/option.entity";
import { Client } from "src/clients/entities/client.entity";
import { Response } from "src/surveys/entities/response.entity";
import { QuestionType } from "src/surveys/entities/questiontype.entity";
import { Answer } from "src/surveys/entities/answer.entity";
import { Business } from "src/surveys/entities/business.entity";
import { Role } from "src/users/entities/roles.entity";
import { Subscription } from "src/subscriptions/entities/subscription.entity";
import { SubscriptionType } from "src/subscriptions/entities/subscriptiontype.entity";
import { Product } from "../products/entities/product.entity";
import { Store } from "src/products/entities/store.entity";

const entities = [User, Survey, Question, Option, Response, Client, QuestionType, Answer, Business, Role, Subscription, SubscriptionType, Product, Store];
export { User, Survey, Question, Option, Response, Client, QuestionType, Answer, Business, Role, Subscription, SubscriptionType, Product, Store };
export default entities;