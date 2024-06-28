import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly title: string;
  @IsOptional()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly sku: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly categoryId: string;
}
