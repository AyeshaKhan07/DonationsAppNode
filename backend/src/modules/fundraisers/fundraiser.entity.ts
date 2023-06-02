import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "../users/user.entity"

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

    @ManyToOne(() => User, user => user.pages)
    user: Number

}