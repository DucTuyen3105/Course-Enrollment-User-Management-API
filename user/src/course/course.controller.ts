import {Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {CourseService} from "./course.service";
import {CourseResponse} from "../dto/response/CourseResponse";
import {CourseRequest} from "../dto/request/CourseRequest";
import {Role} from "../enum/role.enum";
import {Roles} from "../decorator/role.decorator";
import {Public} from "../decorator/auth.decorator";
import {GlobalResponseType} from "../GlobalResponse/global.response.type";
import {GlobalResponseData} from "../GlobalResponse/global.response.data";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {ListCourseResponseForAdmin} from "../dto/response/ListCourseResponseForAdmin";
@ApiBearerAuth()
@Controller('course')
export class CourseController {
    constructor(private courseService : CourseService) {
    }
    @ApiOperation({summary: 'Xem danh sách các khóa học(role : admin)'})
    @Get()
    @Roles(Role.Admin)
    async getListCourse(): Promise<GlobalResponseType<ListCourseResponseForAdmin[]>>
    {
        return new GlobalResponseData(await this.courseService.getListCourse(),"SUCCESS",200);
    }
    @ApiOperation({summary: 'Xem thông tin từng khóa học(role : admin)'})
    @Get('/:id')
    @Public()
    async getDetailCourse( @Param('id') id : string): Promise<GlobalResponseType<CourseResponse>>
    {
        return new GlobalResponseData(await this.courseService.getDetailCourse(id),"SUCCESS",200);
    }
    @ApiOperation({summary: 'thêm mới khóa học(role : admin)'})
    @Put('/:id')
    @Roles(Role.Admin)
    async createCourse(@Body(new ValidationPipe()) request : CourseRequest): Promise<GlobalResponseData<CourseResponse>>
    {

        return new GlobalResponseData(await this.courseService.createCourse(request),"SUCCESS",200);
    }
    @ApiOperation({summary: 'xóa khóa học (role : admin)'})
    @Delete('/:id')
    @Roles(Role.Admin)
    async deleteCourse(@Param('id') id : string): Promise<GlobalResponseData<CourseResponse>>
    {
        return new GlobalResponseData(await this.courseService.deleteCourse(id),"SUCCESS",200);
    }
}
