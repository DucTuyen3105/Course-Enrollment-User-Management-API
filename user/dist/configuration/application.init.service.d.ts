import { OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';
export declare class ApplicationInitService implements OnApplicationBootstrap {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    onApplicationBootstrap(): Promise<void>;
}
