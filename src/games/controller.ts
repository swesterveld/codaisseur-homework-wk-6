import {
  JsonController,
  Get,
  Post,
  BodyParam,
  HttpCode,
  Param,
  Put,
  Body,
  NotFoundError,
  BadRequestError,
} from 'routing-controllers'

import Game, {Colors} from './entity'

type Cell = 'o' | 'x' | ' '
type Row = [Cell, Cell, Cell]
type Board = [Row, Row, Row]
const defaultBoard: Board = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

@JsonController()
export default class GameController {

  @Get('/games')
  async getGames() {
    const games = await Game.find()
    return {
      games
    }
  }

  @Post('/games')
  @HttpCode(201)
  startGame(
    @BodyParam('name') name: string
  ) {
    const color = Colors[Math.trunc(Math.random()*Object.keys(Colors).length/2)]

    const game = new Game()
    game.name = name
    game.color = color
    game.board = JSON.parse(JSON.stringify(defaultBoard))

    return game.save()
  }

  @Put('/games/:id')
  async changeGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOne(Number(id))

    if (!game) throw new NotFoundError('Cannot find game')

    const merged = Game.merge(game, update)

    if (merged.hasValidColor()) {
      return merged.save()
    } else {
      throw new BadRequestError(`Invalid color`)
    }
  }
}