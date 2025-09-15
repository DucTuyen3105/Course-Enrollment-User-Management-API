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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const SignInRequest_1 = require("../dto/request/SignInRequest");
const auth_service_1 = require("./auth.service");
const auth_decorator_1 = require("../decorator/auth.decorator");
const CreateUserRequest_1 = require("../dto/request/CreateUserRequest");
const LogOutRequest_1 = require("../dto/request/LogOutRequest");
const global_response_data_1 = require("../GlobalResponse/global.response.data");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(request) {
        return new global_response_data_1.GlobalResponseData(await this.authService.signIn(request), "SUCCESS", 200);
    }
    async signUp(request) {
        return new global_response_data_1.GlobalResponseData(await this.authService.signUp(request), "SUCCESS", 200);
    }
    async logOut(request) {
        console.log(request);
        return new global_response_data_1.GlobalResponseData(await this.authService.logOut(request), "SUCCESS", 200);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('SignIn'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng nhập (role : admin,user)' }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignInRequest_1.SignInRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('SignUp'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng kí (role : admin,user)' }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserRequest_1.CreateUserRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('LogOut'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'vô hiệu hóa token (role : admin,user)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LogOutRequest_1.LogOutRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map