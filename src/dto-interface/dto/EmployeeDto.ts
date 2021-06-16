import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDate,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUppercase,
  Matches,
  MaxDate,
  MaxLength,
  MinDate,
  NotContains,
  validate,
} from 'class-validator';
import { availableCountries } from '../../helpers/countries';
import { availableAreas } from '../../helpers/areas';
import { availableTypes } from '../../helpers/idTypes';
import { PartialType } from '@nestjs/swagger';

const today = new Date();
const joinedToday = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;
const lastMonth = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

export class EmployeeDto {
  @IsEmpty()
  id: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(20)
  employeeId: string;

  @IsNotEmpty()
  @Matches(/^[A-Z\s]+$/, {
    message: 'lastName Should only contain chars. from A-Z (Caps) and spaces',
  })
  @NotContains('Ñ', {
    message: 'lastName1 Should NOT contain special characters',
  })
  @MaxLength(20)
  @IsUppercase()
  lastName1: string;

  @IsNotEmpty()
  @IsAlpha()
  @NotContains('Ñ', {
    message: 'lastName2 Should NOT contain special characters',
  })
  @MaxLength(20)
  @IsUppercase()
  lastName2: string;

  @IsNotEmpty()
  @IsAlpha()
  @NotContains('Ñ', { 
    message: 'name1 Should NOT contain special characters'
  })
  @MaxLength(20)
  @IsUppercase()
  name1: string;

  @IsOptional()
  @IsAlpha()
  @NotContains('Ñ', { 
    message: 'name2 Should NOT contain special characters'
  })
  @MaxLength(50)
  @IsUppercase()
  name2: string;

  @IsNotEmpty()
  @IsIn(availableCountries)
  country: string;

  @IsIn(availableTypes)
  @IsNotEmpty()
  idType: string;

  @IsNotEmpty()
  @IsIn(availableAreas)
  area: string;

  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date(joinedToday))
  @MinDate(new Date(lastMonth))
  admission: Date;

  @IsEmpty({ message: 'Mail is auto-generated'})
  mail: string;

  @IsEmpty({ message: 'status is auto-generated'})
  status: number;

  @IsEmpty({ message: 'createdAt is auto-generated'})
  createdAt: Date;

  @IsEmpty({ message: 'updatedAt is auto-generated'})
  updatedAt: Date;
}

export class UpdateEmpDto extends PartialType(EmployeeDto) {}

