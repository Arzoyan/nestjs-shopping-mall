import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();

    return products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productModel.find({ categoryId });

    return products;
  }

  async findOne(id: string): Promise<Product> {
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
    const product = await this.productModel.findOneAndUpdate(
      { _id: id },
      updateProductDto,
    );
    return product;
  }

  async delete(id: string): Promise<any> {
    return await this.productModel.deleteOne({ _id: id });
  }
}
