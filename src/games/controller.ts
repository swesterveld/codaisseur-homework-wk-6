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
    if (update.board) {
      console.log(game)
      /*
      let old_board = JSON.parse(game.board)
      let new_board = JSON.parse(update.board)
      console.log('old_board', old_board)
      console.log('new_board', new_board)
      let moves = Game.moves(old_board, new_board)
      console.log('n/o moves', moves)
      */
      if (Game.isValidMove(JSON.parse(game.board), JSON.parse(update.board))) {
        throw new BadRequestError('Invalid move')
      }
      const merged = Game.merge(game, update)

      if (Game.isValidColor(merged.color)) {
        return merged.save()
      } else {
        throw new BadRequestError(`Invalid color`)
      }
    }
  }
}