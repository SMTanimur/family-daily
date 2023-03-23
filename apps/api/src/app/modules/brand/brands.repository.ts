
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';
import { Brand, BrandDocument } from './schemas';
import { GetBrandsDto } from './dto/get-brands';
import { AbstractRepository } from '@family-daily/common';

export class BrandsRepository extends AbstractRepository<BrandDocument> {
  protected readonly logger = new Logger(BrandsRepository.name);

  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: PaginateModel<BrandDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(brandModel, connection);
  }

  async getBrands({
    limit,
    search,
    type,
    page,
    orderBy,
    sortedBy,
  }: GetBrandsDto) {
    const brands = await this.brandModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(type ? { type } : {}),
      },
      { page, limit, sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 } }
    );

    const from =
      brands.page === 1 ? 1 : brands.page * brands.limit - brands.limit + 1;

    const to =
      brands.page === brands.totalPages
        ? brands.totalDocs
        : brands.page * brands.limit;

    return {
      items: brands.docs,
      navigation: {
        total: brands.totalDocs,
        limit: brands.limit,
        pages: brands.totalPages,
        page: brands.page,
        from,
        to,
        type: 'page',
      },
    };
  }
}
