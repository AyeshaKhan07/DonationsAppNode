import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('currencies')
export class Currency {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        type: 'char'
    })
    name: string
    
    @Column({
        length: 10,
        type: 'char'
    })
    code: string

}