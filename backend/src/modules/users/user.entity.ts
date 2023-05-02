import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
import { encryptTohashPassword } from "../../utils/crypto"

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

}