"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const CreateUserRequest_1 = require("../dto/request/CreateUserRequest");
const UpdateUserRequest_1 = require("../dto/request/UpdateUserRequest");
const auth_decorator_1 = require("../decorator/auth.decorator");
const role_decorator_1 = require("../decorator/role.decorator");
const role_enum_1 = require("../enum/role.enum");
const RegisterCourseRequest_1 = require("../dto/request/RegisterCourseRequest");
const global_response_data_1 = require("../GlobalResponse/global.response.data");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getListUser() {
        return new global_response_data_1.GlobalResponseData(await this.userService.getListUser(), "SUCCESS", 200);
    }
    async getDetailUser(id) {
        return new global_response_data_1.GlobalResponseData(await this.userService.getDetail(id), "SUCCESS", 200);
    }
    async createUser(request) {
        return new global_response_data_1.GlobalResponseData(await this.userService.createUser(request), "SUCCESS", 200);
    }
    async updateUser(req, request) {
        const result = await this.userService.updateUser(req.user.id, request);
        return new global_response_data_1.GlobalResponseData(result, "SUCCESS", 200);
    }
    async deleteUser(id) {
        return new global_response_data_1.GlobalResponseData(await this.userService.deleteUser(id), "SUCCESS", 200);
    }
    async registerCourse(id1, id2) {
        return new global_response_data_1.GlobalResponseData(await this.userService.registerCourse(new RegisterCourseRequest_1.RegisterCourseRequest(id1, id2)), "SUCCESS", 200);
    }
    async unregisterCourse(id1, id2) {
        return new global_response_data_1.GlobalResponseData(await this.userService.unregisterCourse(id1, id2), "SUCCESS", 200);
    }
    async getSelfUser(req) {
        return new global_response_data_1.GlobalResponseData(await this.userService.getDetail(req.user.id), "SUCCESS", 200);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy toàn bộ thông tin người dùng (role : admin)' }),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getListUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin từng người dùng (role : admin)' }),
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiParam)({
        description: 'sử dụng token admin lấy list người dùng để có được id người dùng',
        name: 'id',
    }),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDetailUser", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserRequest_1.CreateUserRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin người dùng dựa trên token nếu là admin thì trả về list còn user thì trả về thông tin user' }),
    (0, common_1.Put)("/update"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateUserRequest_1.UpdateUserRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'xóa người dùng dựa trên id của người dùng (role : admin)' }),
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('RegisterCourse/:id1/:id2'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Người dùng chọn khóa học để đăng kí (role : admin,user)' }),
    (0, swagger_1.ApiParam)({
        name: 'id1',
        description: 'ID người dùng muốn đăng kí (sử dụng token admin lấy list ng dùng để có được id cần thiết',
        schema: { type: 'string' },
    }),
    (0, swagger_1.ApiParam)({
        name: 'id2',
        description: 'ID khóa học đăng kí (sử dụng token admin lấy list khóa học để có được id cần thiết',
        schema: { type: 'string' },
    }),
    __param(0, (0, common_1.Param)('id1')),
    __param(1, (0, common_1.Param)('id2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerCourse", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id1',
        description: 'ID người dùng muốn hủy đăng kí (sử dụng token admin lấy list người dùng để có được id cần thiết',
        schema: { type: 'string' },
    }),
    (0, swagger_1.ApiParam)({
        name: 'id2',
        description: 'ID khóa học hủy đăng kí (sử dụng token admin lấy list khóa học để có được id cần thiết)',
        schema: { type: 'string' },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Người dùng hủy đăng kí khóa học (role : admin,user)' }),
    (0, common_1.Post)('UnregisterCourse/:id1/:id2'),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id1')),
    __param(1, (0, common_1.Param)('id2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unregisterCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Người dùng xem thông tin cá nhân của chính họ dựa trên token (role : admin,user)' }),
    (0, common_1.Get)('/self/user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSelfUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map