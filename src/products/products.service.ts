import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationUtil } from 'src/utils/validation.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.checkDuplicateSKU(createProductDto.sku);
    const product = await new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();

    return products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[]> {
    ValidationUtil.validateObjectId(categoryId);
    const products = await this.productModel.find({ categoryId });

    return products;
  }

  async findOne(id: string): Promise<Product> {
    ValidationUtil.validateObjectId(id);

    const product = await this.productModel.findById({ _id: id });

    if (!product) {
      throw new NotFoundException('category not found');
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    ValidationUtil.validateObjectId(id);

    if (updateProductDto.sku) {
      await this.checkDuplicateSKU(updateProductDto.sku);
    }
    return await this.productModel.findOneAndUpdate(
      { _id: id },
      updateProductDto,
    );
  }

  async delete(id: string): Promise<any> {
    ValidationUtil.validateObjectId(id);
    return await this.productModel.deleteOne({ _id: id });
  }

  private async checkDuplicateSKU(sku: string): Promise<void> {
    const existingProduct = await this.productModel.findOne({ sku });
    if (existingProduct) {
      throw new BadRequestException(
        'A product with the same SKU already exists',
      );
    }
  }
}
