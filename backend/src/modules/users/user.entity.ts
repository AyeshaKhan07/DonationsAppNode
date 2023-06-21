import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm"

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
        type: 'int',
        default: null
    })
    totalDonations: number

    @Column({
        type: 'int',
        default: null
    })
    totalDonationsRaised: number

    @Column({
        length: 200,
        type: 'char',
        // select: false
    })
    password: string

    
    @ManyToMany(() => Fundraiser, fundraiser => fundraiser.teamMembers)
    @JoinTable()
    pages: Fundraiser[]
    
    @OneToMany(() => Donation, donation => donation.user)
    donations: Donation[]
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await encryptTohashPassword(this.password);
    }

}