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
exports.CustomerPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let CustomerPrismaRepository = class CustomerPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, skip, take, search) {
        const where = {
            tenant_id: tenantId,
            deleted_at: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.customers.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
            this.prisma.customers.count({ where })
        ]);
        return { data, total };
    }
    async findById(tenantId, id) {
        return this.prisma.customers.findFirst({ where: { id, tenant_id: tenantId, deleted_at: null } });
    }
    async create(data) {
        return this.prisma.customers.create({ data: data });
    }
    async update(tenantId, id, data) {
        return this.prisma.customers.update({
            where: { id },
            data: data
        });
    }
    async softDelete(tenantId, id) {
        await this.prisma.customers.update({
            where: { id },
            data: { deleted_at: new Date() }
        });
    }
};
exports.CustomerPrismaRepository = CustomerPrismaRepository;
exports.CustomerPrismaRepository = CustomerPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerPrismaRepository);
//# sourceMappingURL=customer.prisma.repository.js.map