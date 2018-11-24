import {JsonController, Get} from 'routing-controllers'

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
}