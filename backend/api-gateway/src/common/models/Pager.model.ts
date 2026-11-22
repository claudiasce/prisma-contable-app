import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsObject,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsArray,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class Pager {
  @ApiProperty({ required: true })
  @IsNumber()
  page: number;

  @ApiProperty({ required: true })
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortDirection: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortColumn: string;
}
