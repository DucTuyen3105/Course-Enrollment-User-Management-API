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
exports.CatchEverythingFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let CatchEverythingFilter = class CatchEverythingFilter {
    httpAdapterHost;
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (exception instanceof common_1.HttpException) {
            const httpStatus = exception.getStatus();
            const response = exception.getResponse();
            let responseBody;
            if (typeof response === 'string') {
                responseBody = {
                    message: response,
                    httpStatusCode: httpStatus,
                };
            }
            else if (Array.isArray(response.message)) {
                responseBody = {
                    message: response.message,
                    httpStatusCode: httpStatus,
                };
            }
            else if (typeof response.message === 'string') {
                responseBody = {
                    message: response.message,
                    httpStatusCode: httpStatus,
                };
            }
            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
    }
};
exports.CatchEverythingFilter = CatchEverythingFilter;
exports.CatchEverythingFilter = CatchEverythingFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], CatchEverythingFilter);
//# sourceMappingURL=global.exception.js.map