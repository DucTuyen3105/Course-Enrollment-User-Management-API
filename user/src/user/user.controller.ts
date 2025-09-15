import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, ValidationPipe,Request} from '@nestjs/common'
import {UserService} from "./user.service";
import {CreateUserRequest} from "../dto/request/CreateUserRequest";
import {UserResponse} from "../dto/response/UserResponse";
import {UpdateUserRequest} from "../dto/request/UpdateUserRequest";
import {Public} from "../decorator/auth.decorator";
import {Roles} from "../decorator/role.decorator";
import {Role} from "../enum/role.enum";
import {RegisterCourseRequest} from "../dto/request/RegisterCourseRequest";
import {GlobalResponseType} from "../GlobalResponse/global.response.type";
import {GlobalResponseData} from "../GlobalResponse/global.response.data";
import {ApiBearerAuth, ApiOperation, ApiProperty,ApiParam} from "@nestjs/swagger";
import {ListUserResponseForAdmin} from "../dto/response/ListUserResponseForAdmin";

@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService : UserService) {
    }
    @ApiOperation({summary: 'Lấy toàn bộ thông tin người dùng (role : admin)'})
    @Get()
    @Roles(Role.Admin)
    async getListUser(): Promise<GlobalResponseType<ListUserResponseForAdmin[]>>
    {
        return new GlobalResponseData(await this.userService.getListUser(),
            "SUCCESS", 200);
    }
    @ApiOperation({summary: 'Lấy thông tin từng người dùng (role : admin)'})
    @Get('/:id')
    @ApiParam({
        description: 'sử dụng token admin lấy list người dùng để có được id người dùng',
        name: 'id',
    })
    @Roles(Role.Admin)
    async getDetailUser( @Param('id') id : string): Promise<GlobalResponseType<UserResponse>>
    {
        return new GlobalResponseData(await this.userService.getDetail(id),"SUCCESS", 200);
    }
    @Public()
    async createUser(@Body(new ValidationPipe()) request : CreateUserRequest): Promise<GlobalResponseType<UserResponse>>
    {
        return new GlobalResponseData(await this.userService.createUser(request),"SUCCESS",200);
    }
    @ApiOperation({summary: 'Cập nhật thông tin người dùng dựa trên token nếu là admin thì trả về list còn user thì trả về thông tin user'})
    @Put("/update")
    async updateUser(@Request() req : any, @Body() request : UpdateUserRequest): Promise<GlobalResponseType<UserResponse>>
    {
        const result =  await this.userService.updateUser(req.user.id,request);
        return new GlobalResponseData(result,"SUCCESS", 200);
    }
    @ApiOperation({summary: 'xóa người dùng dựa trên id của người dùng (role : admin)'})
    @Delete('/:id')
    @Roles(Role.Admin)
    async deleteUser(@Param('id') id : string): Promise<GlobalResponseType<UserResponse>>
    {
        return new GlobalResponseData(await this.userService.deleteUser(id),"SUCCESS",200);
    }
    @Post('RegisterCourse/:id1/:id2')
    @Public()
    @ApiOperation({summary: 'Người dùng chọn khóa học để đăng kí (role : admin,user)'})
    @ApiParam({
        name: 'id1',
        description: 'ID người dùng muốn đăng kí (sử dụng token admin lấy list ng dùng để có được id cần thiết',
        schema: { type: 'string' },
    })
    @ApiParam({
        name: 'id2',
        description: 'ID khóa học đăng kí (sử dụng token admin lấy list khóa học để có được id cần thiết',
        schema: { type: 'string' },
    })
    async registerCourse(@Param('id1') id1 : string, @Param('id2') id2 : string) : Promise<GlobalResponseType<UserResponse>> {
        return new GlobalResponseData(await this.userService.registerCourse(new RegisterCourseRequest(id1, id2)),"SUCCESS",200);
    }
    @ApiParam({
        name: 'id1',
        description: 'ID người dùng muốn hủy đăng kí (sử dụng token admin lấy list người dùng để có được id cần thiết',
        schema: { type: 'string' },
    })
    @ApiParam({
        name: 'id2',
        description: 'ID khóa học hủy đăng kí (sử dụng token admin lấy list khóa học để có được id cần thiết)',
        schema: { type: 'string' },
    })
    @ApiOperation({summary: 'Người dùng hủy đăng kí khóa học (role : admin,user)'})
    @Post('UnregisterCourse/:id1/:id2')
    @Public()
    async unregisterCourse(@Param('id1') id1 : string, @Param('id2') id2 : string) : Promise<GlobalResponseType<UserResponse>> {

        return new GlobalResponseData(await this.userService.unregisterCourse(id1,id2),"SUCCESS",200)
    }
    @ApiOperation({summary: 'Người dùng xem thông tin cá nhân của chính họ dựa trên token (role : admin,user)'})
    @Get('/self/user')
    async getSelfUser(@Request() req : any): Promise<GlobalResponseType<UserResponse>>
    {
        return new GlobalResponseData(await this.userService.getDetail(req.user.id),"SUCCESS",200)
    }
}
