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

import Game from './entity'

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
    if (!name) throw new BadRequestError('Bad Request')

    const game = new Game(name)
    return game.save()
  }

  @Put('/games/:id')
  async changeGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) {
      return new NotFoundError('Cannot find game')
    }

    const validMove = Game.isValidMove(JSON.parse(game.board), JSON.parse(update.board))
    if (!validMove) {
      throw new BadRequestError('Invalid move')
    }

    const validColor = Game.isValidColor(update.color)
    if (!validColor) {
      throw new BadRequestError(`Invalid color`)
    }

    const merged = Game.merge(game, update)
    return merged.save()
  }
}