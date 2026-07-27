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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_interface_1 = require("./repositories/customer.repository.interface");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findAll(tenantId, page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        return this.customerRepository.findAll(tenantId, skip, limit, search);
    }
    async findById(tenantId, id) {
        const customer = await this.customerRepository.findById(tenantId, id);
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async create(tenantId, userId, data) {
        return this.customerRepository.create({
            ...data,
            tenant_id: tenantId,
            created_by: userId,
            updated_by: userId,
        });
    }
    async update(tenantId, id, userId, data) {
        await this.findById(tenantId, id);
        return this.customerRepository.update(tenantId, id, { ...data, updated_by: userId });
    }
    async remove(tenantId, id) {
        await this.findById(tenantId, id);
        await this.customerRepository.softDelete(tenantId, id);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(customer_repository_interface_1.I_CUSTOMER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CustomerService);
//# sourceMappingURL=customer.service.js.map