import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"

import { Currency } from "../currencies/currency.entity"
import { City } from "../cities/city.entity"

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        type: 'char'
    })
    name: string
    
    @ManyToOne(() => Currency, currency => currency.id, { nullable: false })
    currency: Currency

    @OneToMany(() => City, city => city.country)
    cities: City[]

}