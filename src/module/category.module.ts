import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "../api/category.controller";
import { CategoryService } from "../service/category.service";
import { BookCategory } from "../entity/book-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
