import HttpException from "../../utils/http-exception";
import { PaymentMethod } from "./payment-method.entity";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import BaseService from "../../abstracts/repository.abstact";

class PaymentMethodService extends BaseService<PaymentMethod> {
    constructor() {
        super(PaymentMethod)
    }

    // public async create(page: CreatePageDto) {
    //     return await this.paymentMethodRepository.save(page)
    // }

    async findByIdOrFail(id: number): Promise<PaymentMethod> {
        const paymentMethod = await this.repository.findOneBy({ id });

        if (!paymentMethod)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Payment method not found")

        return paymentMethod
    }
    async findById(id: number): Promise<PaymentMethod> {
        return await this.repository.findOneBy({ id });
    }
}

export default PaymentMethodService;