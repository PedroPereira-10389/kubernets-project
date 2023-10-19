import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MinLength(3)
    reference: string;

    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    quantity: number;
}
