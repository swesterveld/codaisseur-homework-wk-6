import {JsonController, Get, Post, BodyParam, HttpCode} from 'routing-controllers'

import Game from './entity'

enum Colors {
  'red',
  'blue',
  'green',
  'yellow',
  'magenta'
}

const defaultBoard = [
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
  createGame(
    @BodyParam('name') name: string
  ): Promise<Game> {
    const color = Colors[Math.trunc(Math.random()*Object.keys(Colors).length/2)]

    const game = new Game()
    game.name = name
    game.color = color
    game.board = JSON.parse(JSON.stringify(defaultBoard))

    return game.save()
  }
}