import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm"

import { encryptTohashPassword } from "../../utils/crypto"
import { Fundraiser } from "../fundraisers/fundraiser.entity"
import { Donation } from "../donations/donations.entity"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        type: 'char'
    })
    firstName: string

    @Column({
        length: 50,
        type: 'char'
    })
    lastName: string

    @Column({
        length: 50,
        type: 'char'
    })
    email: string

    @Column({
        length: 50,
        type: 'char'
    })
    contact: string

    @Column({
        length: 200,
        type: 'char'
    })
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await encryptTohashPassword(this.password);
    }

    @OneToMany(() => Fundraiser, fundraiser => fundraiser.user)
    pages: Fundraiser[]
    
    @OneToMany(() => Donation, donation => donation.user)
    donations: Donation[]

}