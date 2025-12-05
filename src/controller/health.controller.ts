import type { RequestHandler } from 'express'

import { STATUS_CODES } from '../enums/status.codes.enums'
import { ApiResponse } from '../utils/response.utils'

export default class HealthController {
  public getHealth: RequestHandler = (_, res, next) => {
    try {
      res
        .status(STATUS_CODES.OK)
        .send(ApiResponse.success('Server is UP and RUNNING'))
    } catch (error) {
      next(error)
    }
  }
}
