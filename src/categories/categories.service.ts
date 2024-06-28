import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import * as mongoose from 'mongoose';
import { ValidationUtil } from 'src/utils/validation.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();

    return categories;
  }

  async findOne(id: string): Promise<Category> {
    ValidationUtil.validateObjectId(id);

    const category = await this.categoryModel.findById({ _id: id });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }
}
