import cors from 'cors'
import express from 'express'

import config from '../config/config.js'
import { STATUS_CODES } from '../enums/status.codes.enums.js'
import globalLoggerMiddleware from '../middlewares/error.handlers/global.error.handler.js'
import loggerMiddleware from '../middlewares/logger/global.logger.middleware.js'
import router from '../routes/rootRouter'
import { ApiResponse } from '../utils/response.utils.js'

const PORT = config.PORT

const app = express()

export default function createServer() {
  app.use(cors())
  app.use(express.json())
  app.use(loggerMiddleware)
  app.use(globalLoggerMiddleware)
  app.use(router)
  app.use((req, res) => {
    res
      .status(STATUS_CODES.NOT_FOUND)
      .send(ApiResponse.error('Route Not Found'))
  })
}

export const server = app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`)
})
