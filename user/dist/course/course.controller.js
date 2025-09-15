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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const CourseRequest_1 = require("../dto/request/CourseRequest");
const role_enum_1 = require("../enum/role.enum");
const role_decorator_1 = require("../decorator/role.decorator");
const auth_decorator_1 = require("../decorator/auth.decorator");
const global_response_data_1 = require("../GlobalResponse/global.response.data");
const swagger_1 = require("@nestjs/swagger");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getListCourse() {
        return new global_response_data_1.GlobalResponseData(await this.courseService.getListCourse(), "SUCCESS", 200);
    }
    async getDetailCourse(id) {
        return new global_response_data_1.GlobalResponseData(await this.courseService.getDetailCourse(id), "SUCCESS", 200);
    }
    async createCourse(request) {
        return new global_response_data_1.GlobalResponseData(await this.courseService.createCourse(request), "SUCCESS", 200);
    }
    async deleteCourse(id) {
        return new global_response_data_1.GlobalResponseData(await this.courseService.deleteCourse(id), "SUCCESS", 200);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Xem danh sách các khóa học(role : admin)' }),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getListCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Xem thông tin từng khóa học(role : admin)' }),
    (0, common_1.Get)('/:id'),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getDetailCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'thêm mới khóa học(role : admin)' }),
    (0, common_1.Put)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CourseRequest_1.CourseRequest]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'xóa khóa học (role : admin)' }),
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map