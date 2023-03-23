import { PaginationArgs } from '@family-daily/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update-blog';
import { BlogDocument } from './schemas';


@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<string> {

      await this.blogsRepository.create(createBlogDto);
      return 'Blog successfully created';
  
      
  
  }

  async updateBlog(updateCategoryDto: UpdateBlogDto): Promise<string> {
      const blog = await this.blogsRepository.findOne({
        _id: updateCategoryDto._id,
      });
      if (blog) {
        await this.blogsRepository.findOneAndUpdate(
          { _id: updateCategoryDto._id },
          updateCategoryDto
        );
        return 'successfully updated';
      } else {
        throw new NotFoundException('Not found');
      }
  }

  async findBlogs (){
    return await this.blogsRepository.find({})
  }

  async getLatestBlogs(paginate:PaginationArgs){
    return await this.blogsRepository.getLatestBlogs(paginate)
  }

  async findBlog (slug:string):Promise<BlogDocument>{
    const blog = await this.blogsRepository.findOne({slug})
    if(!blog) throw new NotFoundException("Not Found")
    return blog
  }

  async deleteBlog(slug:string):Promise<string>{
    const blog = await this.blogsRepository.findOne({slug})
    if(!blog) throw new NotFoundException("Not found blog")
    await this.blogsRepository.findOneAndRemove({slug})
    return ` blog successfully deleted`
  }
}