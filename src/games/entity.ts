import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

export enum Colors {
  'red',
  'blue',
  'green',
  'yellow',
  'magenta'
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    type: 'text',
    nullable: false
  })
  name: string

  @Column({
    type: 'text',
    nullable: false
  })
  color: string

  @Column({
    type: 'json',
    nullable: false
  })
  board: string
}