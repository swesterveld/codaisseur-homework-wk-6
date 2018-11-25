import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
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
  board: string

  constructor(name: string) {
    super()
    this.name = name
    this.color = Colors[Math.trunc(Math.random()*Object.keys(Colors).length/2)]
    this.board = JSON.parse(JSON.stringify(defaultBoard))
  }

  static isValidMove = (board1, board2) =>
    board1
      .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
      .reduce((a, b) => a.concat(b))
      .length === 1

  static isValidColor = (color): boolean => {
    return new Validator().isEnum(color, Colors)
  }
}