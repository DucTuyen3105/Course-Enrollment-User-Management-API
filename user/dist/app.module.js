"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const course_module_1 = require("./course/course.module");
const auth_module_1 = require("./auth/auth.module");
const application_init_service_1 = require("./configuration/application.init.service");
const user_entity_1 = require("./entities/user.entity");
const course_entity_1 = require("./entities/course.entity");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("./auth/role.guard");
const auth_guard_1 = require("./auth/auth.guard");
const token_entity_1 = require("./entities/token.entity");
const global_exception_1 = require("./ExceptionFilter/global.exception");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'usermanagement',
                entities: [user_entity_1.UserEntity, course_entity_1.CourseEntity, token_entity_1.TokenEntity],
                synchronize: true,
            }),
            course_module_1.CourseModule,
            auth_module_1.AuthModule,],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, application_init_service_1.ApplicationInitService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_1.CatchEverythingFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map