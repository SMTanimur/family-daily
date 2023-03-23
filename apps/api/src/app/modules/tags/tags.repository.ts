
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';
import { Tag, TagDocument } from './schemas';
import { GetTagsDto } from './dto/get-tags';
import { AbstractRepository } from '@family-daily/common';


export class TagsRepository extends AbstractRepository<TagDocument> {
  protected readonly logger = new Logger(TagsRepository.name);

  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: PaginateModel<TagDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(tagModel, connection);
  }

  async getTags({
    limit,
    search,
    type,
    page,
    orderBy,
    sortedBy,
  }: GetTagsDto) {
    const tags = await this.tagModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(type ? { type } : {}),
      },
      { page, limit, sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 } }
    );

    const from =
      tags.page === 1 ? 1 : tags.page * tags.limit - tags.limit + 1;

    const to =
      tags.page === tags.totalPages
        ? tags.totalDocs
        : tags.page * tags.limit;

    return {
      items: tags.docs,
      navigation: {
        total: tags.totalDocs,
        limit: tags.limit,
        pages: tags.totalPages,
        page: tags.page,
        from,
        to,
        type: 'page',
      },
    };
  }
}
