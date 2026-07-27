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
exports.UserPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let UserPrismaRepository = class UserPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(tenantId, email) {
        const user = await this.prisma.users.findUnique({
            where: { uq_users_tenant_email: { tenant_id: tenantId, email } },
        });
        return user;
    }
    async findById(id) {
        const user = await this.prisma.users.findUnique({ where: { id } });
        return user;
    }
    async create(data) {
        const user = await this.prisma.users.create({ data: data });
        return user;
    }
    async update(id, data) {
        const user = await this.prisma.users.update({ where: { id }, data: data });
        return user;
    }
};
exports.UserPrismaRepository = UserPrismaRepository;
exports.UserPrismaRepository = UserPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserPrismaRepository);
//# sourceMappingURL=user.prisma.repository.js.map