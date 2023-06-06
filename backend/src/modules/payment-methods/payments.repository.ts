import HttpException from "../../utils/http-exception";
import { PaymentMethod } from "./payment-method.entity";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";

class PaymentMethodRepository {
    private paymentMethodRepository = connectionSource.getRepository(PaymentMethod);

    // public async create(page: CreatePageDto) {
    //     return await this.paymentMethodRepository.save(page)
    // }

    async findById(id: number) {
        const paymentMethod = await this.paymentMethodRepository.findOneBy({ id });

        if (!paymentMethod)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Payment method not found")

        return paymentMethod
    }

}

export default PaymentMethodRepository;