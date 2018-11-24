import {JsonController, Get} from 'routing-controllers'

@JsonController()
export default class GameController {

  @Get("/games")
  getGames() {
    return {
      todo: 'implement'
    }
  }
}