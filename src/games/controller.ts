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

    if (update.board && !Game.isValidMove(game.board, update.board)) {
      throw new BadRequestError('Invalid move')
    }

    if (update.color && !Game.isValidColor(update.color)) {
      throw new BadRequestError(`Invalid color`)
    }

    const merged = Game.merge(game, update)
    return merged.save()
  }
}