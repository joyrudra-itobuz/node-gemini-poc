import type { NextFunction, Request, Response } from 'express'

import { ApiResponse } from '../../utils/response.utils'

export default function globalErrorHandler(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error('Global Error Handler:', error)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res
    .status(statusCode)
    .send(ApiResponse.error(error.message || 'Internal Server Error'))
}
