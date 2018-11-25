import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {Exclude} from 'class-transformer'
import {Validate, Validator} from 'class-validator'
import {ValidColorValidator} from "./validator"

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

  @Validate(ValidColorValidator, {
    message: 'Color $value is invalid'
  })
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

  @Exclude()
  hasValidColor = () => {
    return new Validator().isEnum(this.color, Colors)
  }
}