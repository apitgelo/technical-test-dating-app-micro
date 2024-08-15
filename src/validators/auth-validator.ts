import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

export class AuthRegisterInput {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class AuthRegisterValidator {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AuthRegisterInput)
  data!: AuthRegisterInput;
}

export class AuthLoginInput {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class AuthLoginValidator {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AuthLoginInput)
  data!: AuthLoginInput;
}
