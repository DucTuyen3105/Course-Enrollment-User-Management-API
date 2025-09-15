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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRequest = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserRequest {
    name;
    email;
    password;
}
exports.CreateUserRequest = CreateUserRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Tên đăng nhập không được để trống và nhiều hơn 5 kí tự", example: "tuyen" }),
    (0, class_validator_1.MinLength)(5, { message: "Invalid Length" }),
    (0, class_validator_1.IsString)({ message: "Username Invalid" }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "email có đuôi @gmail.com", example: "tuyen@gmail.com" }),
    (0, class_validator_1.IsEmail)({}, { message: "Email Invalid" }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Mật khẩu không được để trống và phải có ít nhất 5 kí tự", example: "12345" }),
    (0, class_validator_1.IsString)({ message: "Password Invalid" }),
    (0, class_validator_1.MinLength)(5, { message: "Password  higher than 5 character" }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "password", void 0);
//# sourceMappingURL=CreateUserRequest.js.map