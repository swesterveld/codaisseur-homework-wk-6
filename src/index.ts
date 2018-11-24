import setupDatabase from './db'

import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import GameController from "./games/controller"

const port = process.env.PORT || 3000

const app = createKoaServer({
  controllers: [GameController]
})

setupDatabase()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
