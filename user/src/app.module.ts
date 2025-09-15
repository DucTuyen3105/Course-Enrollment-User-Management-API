import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import {ApplicationInitService} from "./configuration/application.init.service";
import {UserEntity} from "./entities/user.entity";
import {CourseEntity} from "./entities/course.entity";
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {RolesGuard} from "./auth/role.guard";
import {AuthGuard} from "./auth/auth.guard";
import {TokenEntity} from "./entities/token.entity";
import {CatchEverythingFilter} from "./ExceptionFilter/global.exception";
@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'usermanagement',
      entities: [UserEntity,CourseEntity,TokenEntity],
      synchronize: true,
    }),
    CourseModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService,ApplicationInitService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
