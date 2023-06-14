import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

import { User } from "../users/user.entity";
import { City } from "../cities/city.entity";
import { Country } from "../countries/country.entity";
import { Currency } from "../currencies/currency.entity";
import { Donation } from "../donations/donations.entity";

export enum PageType {
    Public = 1,
    Private = 2,
    Draft = 3,
    Closed = 4
}

@Entity('fundraisers')
export class Fundraiser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        type: 'char'
    })
    name: string

    @Column({
        width: 10,
        type: 'int'
    })
    goal: number

    @Column({
        type: 'enum',
        enum: PageType,
        default: PageType.Private
    })
    pageType: PageType

    @Column({
        type: 'text'
    })
    story: string

    @Column({
        type: 'int',
        default: null
    })
    totalFundsRaised: number

    @ManyToOne(() => User, user => user.pages, { nullable: false })
    user: User

    @OneToMany(() => Donation, donation => donation.page)
    donations: Donation[]

    @ManyToOne(() => City, city => city.id, { nullable: false })
    city: City

    @ManyToOne(() => Country, country => country.id, { nullable: false })
    country: Country

    @ManyToOne(() => Currency, currency => currency.id, { nullable: false })
    currency: Currency

}