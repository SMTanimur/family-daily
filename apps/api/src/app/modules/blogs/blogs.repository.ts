
import { AbstractRepository, PaginationArgs } from '@family-daily/common';
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection,  PaginateModel } from 'mongoose';
import { Blog, BlogDocument } from './schemas';

export class BlogsRepository extends AbstractRepository<BlogDocument> {
  protected readonly logger = new Logger(BlogsRepository.name);

  constructor(
    @InjectModel(Blog.name)
    private readonly BlogModel: PaginateModel<BlogDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(BlogModel, connection);
  }

    // getLatestProducts
    async getLatestBlogs(paginate:PaginationArgs) {
      const blogs = await this.BlogModel.paginate(
        {
          ...paginate,
          sort: { createdAt: -1 },
        },
        {
          limit: paginate.limit,
        }
      );

      const from =
        blogs.page === 1 ? 1 : blogs.page * blogs.limit - blogs.limit + 1;

      const to =
        blogs.page === blogs.totalPages
          ? blogs.totalDocs
          : blogs.page * blogs.limit;

      return {
        items: blogs.docs,
        navigation: {
          total: blogs.totalDocs,
          limit: blogs.limit,
          pages: blogs.totalPages,
          page: blogs.page,
          from,
          to,
          type: 'page',
        },
      };
    }
}
