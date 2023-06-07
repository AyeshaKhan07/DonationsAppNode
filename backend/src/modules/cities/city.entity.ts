import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

import { Country } from "../countries/country.entity"

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        type: 'char'
    })
    name: string
    
    @ManyToOne(() => Country, country => country.id, { nullable: false })
    country: Country
}