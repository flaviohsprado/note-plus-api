import { DeleteApiResponse } from '@/common/decorators/requests/deleteApiResponse.decorator';
import { GetApiResponse } from '@/common/decorators/requests/getApiResponse.decorator';
import { PostApiResponse } from '@/common/decorators/requests/postApiResponse.decorator';
import { PutApiResponse } from '@/common/decorators/requests/putApiResponse.decorator';
import { IAuth } from '@/common/interfaces/auth.interface';
import { HttpCode, Inject } from '@nestjs/common';
import { Body, Controller, Param, Req } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '@utils/usecase-proxy';
import { CategoryModule } from './category.module';
import {
   CreateCategoryDTO,
   UpdateCategoryDTO,
} from './presenters/category.dto';
import { CategoryPresenter } from './presenters/category.presenter';
import { CreateCategoryUseCase } from './use-cases/create-category.usecase';
import { DeleteCategoryUseCase } from './use-cases/delete-category.usecase';
import { FindAllCategoryUseCase } from './use-cases/find-all-categories.usecase';
import { FindOneCategoryUseCase } from './use-cases/find-one-category.usecase';
import { UpdateCategoryUseCase } from './use-cases/update-category.usecase';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
   constructor(
      @Inject(CategoryModule.GET_CATEGORIES_USECASES_PROXY)
      private readonly findAllCategoriesUseCase: UseCaseProxy<FindAllCategoryUseCase>,
      @Inject(CategoryModule.GET_CATEGORY_USECASES_PROXY)
      private readonly findOneCategoryUseCase: UseCaseProxy<FindOneCategoryUseCase>,
      @Inject(CategoryModule.POST_CATEGORY_USECASES_PROXY)
      private readonly createCategoryUseCase: UseCaseProxy<CreateCategoryUseCase>,
      @Inject(CategoryModule.PUT_CATEGORY_USECASES_PROXY)
      private readonly updateCategoryUseCase: UseCaseProxy<UpdateCategoryUseCase>,
      @Inject(CategoryModule.DELETE_CATEGORY_USECASES_PROXY)
      private readonly deleteCategoryUseCase: UseCaseProxy<DeleteCategoryUseCase>,
   ) {}

   @GetApiResponse(CategoryPresenter, ':id')
   public async findOneCategory(
      @Param('id') id: string,
   ): Promise<CategoryPresenter> {
      const category = await this.findOneCategoryUseCase
         .getInstance()
         .execute(id);

      return new CategoryPresenter(category);
   }

   @GetApiResponse(CategoryPresenter)
   public async findAllCategory(
      @Req() req: IAuth,
   ): Promise<CategoryPresenter[]> {
      const categorys = await this.findAllCategoriesUseCase
         .getInstance()
         .execute(req.user.id);

      return categorys.map((category) => new CategoryPresenter(category));
   }

   @PostApiResponse(CategoryPresenter, '', false)
   public async createCategory(
      @Req() req: IAuth,
      @Body() category: CreateCategoryDTO,
   ): Promise<CategoryPresenter> {
      category.userId = req.user.id;
      const createdCategory = await this.createCategoryUseCase
         .getInstance()
         .execute(category);

      return new CategoryPresenter(createdCategory);
   }

   @PutApiResponse(CategoryPresenter, '/:id')
   public async updateCategory(
      @Param('id') id: string,
      @Body() category: UpdateCategoryDTO,
   ): Promise<CategoryPresenter> {
      const updatedCAtegory = await this.updateCategoryUseCase
         .getInstance()
         .execute(id, category);

      return new CategoryPresenter(updatedCAtegory);
   }

   @HttpCode(204)
   @DeleteApiResponse('/:id')
   public async deleteCategory(
      @Param('id') id: string,
   ): Promise<CategoryPresenter> {
      const deletedCategory = await this.deleteCategoryUseCase
         .getInstance()
         .execute(id);

      return new CategoryPresenter(deletedCategory);
   }
}
