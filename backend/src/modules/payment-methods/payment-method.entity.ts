import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('payment-methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        type: 'char'
    })
    name: string

    @Column({
        type: 'int'
    })
    transactionFee: number

}