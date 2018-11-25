import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {Exclude} from 'class-transformer'
import {Validator} from 'class-validator'

type Cell = 'o' | 'x' | ' '
type Row = [Cell, Cell, Cell]
type Board = [Row, Row, Row]

const defaultBoard: Board = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

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
  board: Board

  constructor(name: string) {
    super()
    this.name = name
    this.color = Colors[Math.trunc(Math.random()*Object.keys(Colors).length/2)]
    this.board = JSON.parse(JSON.stringify(defaultBoard))
  }

  @Exclude()
  hasValidColor = (): boolean => {
    return new Validator().isEnum(this.color, Colors)
  }
}