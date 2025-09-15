// src/config/application-init.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class ApplicationInitService implements OnApplicationBootstrap {
    private readonly logger = new Logger(ApplicationInitService.name);

    constructor(private readonly userService: UserService) {}

    async onApplicationBootstrap() : Promise<void>{
        await this.userService.initAdmin()
    }
}
