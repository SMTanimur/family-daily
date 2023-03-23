/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDTO } from './dto/create-category';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category';
import { Category, CategoryDocument } from './schemas';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDTO): Promise<string> {
 
      // const exists = await this.categoriesRepository.findOne({
      //   $or: [
      //     { name: createCategoryDto.name },
      //     { slug: createCategoryDto.slug },
      //   ],
      // });
      // if (exists)
      //   throw new HttpException(
      //     'Category with this name or slug already exists.',
      //     HttpStatus.CONFLICT
      //   );
      const category = await this.categoriesRepository.create(
        createCategoryDto
      );

      if (createCategoryDto.parent) {
        const parent = await this.categoriesRepository.findOne({
          _id: createCategoryDto.parent,
        });
        if (parent) {
          await this.categoriesRepository.findOneAndUpdate(
            { _id: createCategoryDto.parent },
            { $push: { children: category._id } }
          );
        }
      }

      return 'Category successfully created';
   
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<string> {
    const category = await this.categoriesRepository.findOne({ _id: id });
    if (!category) throw new NotFoundException('Not Found');
    const parent = await this.categoriesRepository.findOne({
      _id: updateCategoryDto.parent,
    });
    if (parent) {
      await this.categoriesRepository.findOneAndUpdate(
        { _id: updateCategoryDto.parent },
        { $push: { children: category._id } }
      );

      await this.categoriesRepository.findOneAndUpdate(
        { _id: category.parent },
        { $pull: { children: category._id } }
      );

      await this.categoriesRepository.findOneAndUpdate(
        { _id: id },
        { $set: { parent: updateCategoryDto.parent } }
      );
    }
    await this.categoriesRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: updateCategoryDto,
      }
    );
    return 'Category successfully updated';
  }

  // async getCategories(query: GetCategoriesDto) {
  //   return await this.categoriesRepository.getCategories(query);
  // }
  
  async getAllCategories(query: GetCategoriesDto) {
    return await this.categoriesRepository.getCategoriesAll(query);
  }

  async findCategory(slug: string): Promise<CategoryDocument> {
    const isMongoObjectId = isMongoId(slug);
    let query:any = {}

    if(isMongoObjectId){
      query._id = slug
    }else{
      query.slug = slug
    }
    
    const category = await this.categoriesRepository.findOne(query);
    if (!category) throw new NotFoundException('Not Found');
    return category;
  }

  async getCategory(id: string): Promise<Category> {
    const category = await this.categoriesRepository.getCategoryId(id);
    if (!category) throw new NotFoundException('Not Found');
    return category;
  }
  async deleteCategory(slug: string): Promise<string> {
    const category = await this.categoriesRepository.findOne({ slug });
    if (!category) throw new NotFoundException('Not Found');
    await this.categoriesRepository.findOneAndUpdate(
      { _id: category.parent },
      { $pull: { children: category._id } }
    );
    await this.categoriesRepository.findOneAndRemove({ _id: category._id });
    return 'Category successfully deleted';
  }
}
