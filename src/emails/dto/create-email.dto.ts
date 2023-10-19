import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateEmailDto {
@IsNotEmpty()
@MinLength(3)
name: string;

@IsNotEmpty()
@MinLength(3)
username: string;

@IsNotEmpty()
@IsEmail()
email: string;
}
