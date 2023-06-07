import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

import { User } from "../users/user.entity"
import { City } from "../cities/city.entity"
import { Fundraiser } from "../fundraisers/fundraiser.entity"
import { PaymentMethod } from "../payment-methods/payment-method.entity"

export enum DonationType {
    General = 1,
    Zakat = 2,
    Sadaqah = 3,
}

export enum DonationStatus {
    Pending = 1,
    Confirmed = 2,
    Cancelled = 3,
}

@Entity('donations')
export class Donation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        width: 10,
        type: 'int'
    })
    amount: number

    @Column({ type: 'boolean', default: false })
    anonymousDonation: boolean

    @Column({ type: 'boolean', default: false })
    transactionFeeCovered: boolean

    @Column({
        type: 'enum',
        enum: DonationType,
        default: DonationType.General
    })
    donationType: DonationType

    @Column({
        type: 'enum',
        enum: DonationStatus,
        default: DonationStatus.Pending
    })
    status: DonationStatus

    @ManyToOne(() => User, user => user.donations, { nullable: false })
    user: User
    
    @ManyToOne(() => Fundraiser, fundraiser => fundraiser.donations, { nullable: false })
    page: Fundraiser
    
    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.id, { nullable: false })
    paymentMethod: PaymentMethod
    
    @ManyToOne(() => City, city => city.id, { nullable: false })
    city: City

}