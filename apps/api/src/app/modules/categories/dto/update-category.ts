import { PartialType } from '@nestjs/swagger';

import { CreateCategoryDTO } from './create-category';

export class UpdateCategoryDto extends PartialType(CreateCategoryDTO) {}
