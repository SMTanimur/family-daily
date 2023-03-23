import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandsRepository } from './brands.repository';
import { CreateBrandDto } from './dto/create-brand';
import { GetBrandsDto } from './dto/get-brands';
import { UpdateBrandDto } from './dto/update-brand';
import { BrandDocument } from './schemas';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async createBrand(createCategoryDto: CreateBrandDto): Promise<string> {
      await this.brandsRepository.create(createCategoryDto);
      return 'Brand successfully created';
    
  }

  async updateBrand(id:string,updateCategoryDto: UpdateBrandDto): Promise<string> {
    const brand = await this.brandsRepository.findOne({
      _id:id,
    });
    if (brand) {
      await this.brandsRepository.findOneAndUpdate(
        { _id:id },
        updateCategoryDto
      );

      return 'successfully updated';
    } else {
      throw new NotFoundException('Not found');
    }
  }

  async getBrands(paginate:GetBrandsDto) {
    return await this.brandsRepository.getBrands(paginate);
  }
  async getBrandById(brandId:string) {
    return await this.brandsRepository.findOne({ _id:brandId });
  }

  async findBrand(slug: string): Promise<BrandDocument> {
    const brand = await this.brandsRepository.findOne({ slug });
    if (!brand) throw new NotFoundException('Not Found');
    return brand;
  }

  async deleteBrand(slug: string): Promise<string> {
    const brand = await this.brandsRepository.findOne({ slug });
    if (!brand) throw new NotFoundException('Not found brand');
    await this.brandsRepository.findOneAndRemove({ slug });
    return `${brand.name} brand successfully deleted`;
  }
}
