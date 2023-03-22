/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Logger, NotFoundException } from '@nestjs/common';

import {
  AggregateOptions,
  Connection,
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(
    protected readonly model: Model<T>,
    protected readonly connection: Connection
  ) {}

  async create(document: Omit<T, '_id'>, options?: SaveOptions) {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save(options)).toJSON() as unknown as T;
  }
  async findOne(
    filterQuery: FilterQuery<T>,
    options = { lean: false } as QueryOptions
  ) {
    const document = await this.model.findOne(filterQuery, {}, options);
    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`
      );
      throw new NotFoundException(`${this.model.modelName} not found`);
    }
    return document.toJSON() as unknown as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        new: true,
        lean: true,
      }
    );

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`
      );
      throw new NotFoundException('Document not found');
    }

    return document as unknown as T;
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>) {
    return await this.model.findOneAndUpdate(filterQuery, document, {
      new: true,
      lean: true,
      upsert: true,
    });
  }

  async findOneAndRemove(filterQuery: FilterQuery<T>) {
    try {
      await this.model.findOneAndRemove(filterQuery, { lean: true });
      return `${this.model.modelName} successfully removed`;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async find(filterQuery: FilterQuery<T>) {
    return await this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ createdAt: -1 });
  }

  async aggregate(pipeline?: PipelineStage[], options?: AggregateOptions) {
    return await this.model.aggregate(pipeline, options);
  }

  
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
