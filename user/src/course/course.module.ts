import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseEntity} from "../entities/course.entity";


@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService]
})
export class CourseModule {}
