
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, PaginateModel } from 'mongoose';

import {
  Category,
  CategoryAggregateDocument,
  CategoryDocument,
} from './schemas';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { AbstractRepository } from '@family-daily/common';

export class CategoriesRepository extends AbstractRepository<CategoryDocument> {
  protected readonly logger = new Logger(CategoriesRepository.name);

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: PaginateModel<CategoryDocument>,
    // @InjectModel(Category.name)
    // private readonly categoryAggregateModel: AggregatePaginateModel<CategoryAggregateDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(categoryModel, connection);
  }

  async getCategoriesAll({ limit, page, search, type }: GetCategoriesDto) {
    const categories = await this.categoryModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(type ? { type } : {}),
      },
      { page, limit }
    );

    const from =
      categories.page === 1
        ? 1
        : categories.page * categories.limit - categories.limit + 1;

    const to =
      categories.page === categories.totalPages
        ? categories.totalDocs
        : categories.page * categories.limit;

    return {
      items: categories.docs,
      navigation: {
        total: categories.totalDocs,
        limit: categories.limit,
        pages: categories.totalPages,
        page: categories.page,
        from,
        to,
        type: 'page',
      },
    };
  }

  async getCategoryId(id: string): Promise<Category> {
    return await this.categoryModel.findOne({ _id: id });
  }

  // async getCategories({
  //   limit,
  //   page,
  //   search,
  //   type,
  //   orderBy,
  //   sortedBy,
  // }: GetCategoriesDto) {
  //   const aggregate = this.categoryAggregateModel.aggregate([
  //     {
  //       $match: {
  //         ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
  //         ...(type ? { type: new mongoose.Types.ObjectId(type) } : {}),
  //       },
  //     },
  //     {
  //       $sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 },
  //     },
  //     {
  //       $graphLookup: {
  //         from: 'categories',
  //         startWith: '$_id',
  //         connectFromField: '_id',
  //         depthField: "depth",
  //         connectToField: 'parent',
  //         as: 'children',
  //       },
  //     },
  //     {
  //       $match: {
  //         parent: null,
  //       },
  //     },
  //   ]);
  //   const data = await this.categoryAggregateModel.aggregatePaginate(
  //     aggregate,
  //     { ...(limit ? { limit } : {}), ...(page ? { page } : {}) },
  //   );

  //   const from =
  //   data.page === 1
  //     ? 1
  //     : data.page * data.limit - data.limit + 1;

  // const to =
  //   data.page === data.totalPages
  //     ? data.totalDocs
  //     : data.page * data.limit;

  // return {
  //   items: data.docs,
  //   navigation: {
  //     total: data.totalDocs,
  //     limit: data.limit,
  //     pages: data.totalPages,
  //     page: data.page,
  //     from,
  //     to,
  //     type: 'page',
  //   },
  // };
  // }

}
