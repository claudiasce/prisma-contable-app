import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';
import { Pager } from '../../../common/models/Pager.model';

export class CatalogFindDto extends Pager {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  idCatalog: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
}

export class CatalogGetDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  idCatalog: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
}

export class CatalogDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  idCatalog: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  config: any;
}

export class CatalogByIdDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;
}
