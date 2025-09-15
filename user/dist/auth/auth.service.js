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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("../entities/token.entity");
const SignInResponse_1 = require("../dto/response/SignInResponse");
let AuthService = class AuthService {
    userService;
    jwtService;
    tokenRepository;
    constructor(userService, jwtService, tokenRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
    }
    async signIn(request) {
        const userValidateResponse = await this.userService.validateUser(request);
        const idToken = await this.tokenRepository.save({});
        const payload = { jwtId: idToken.id, ...userValidateResponse };
        const access_token = await this.jwtService.signAsync(payload);
        return new SignInResponse_1.SignInResponse(access_token);
    }
    async signUp(request) {
        return await this.userService.createUser(request);
    }
    async logOut(request) {
        try {
            await this.jwtService.verifyAsync(request.token);
        }
        catch {
            throw new common_1.UnauthorizedException("WrongTokenFormat");
        }
        const decodedToken = await this.jwtService.decode(request.token);
        const findExistToken = await this.tokenRepository.findOneBy({ id: decodedToken.jwtId });
        if (findExistToken) {
            this.tokenRepository.delete(findExistToken);
            return "LogOutSuccessfully";
        }
        throw new common_1.UnauthorizedException("Invalid token");
    }
    async tokenInvalid(jwId) {
        return this.tokenRepository.existsBy({ id: jwId });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(token_entity_1.TokenEntity)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map