import { format } from 'date-fns'
import type { Request, Response, NextFunction } from 'express'

export default function globalLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, headers, params, query, originalUrl, baseUrl, host } = req

    console.info(':::::::::::::::::::::Incoming Request:::::::::::::::::::::')
    console.info({
      body,
      headers,
      params,
      query,
      originalUrl,
      baseUrl,
      host,
      time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    })
    console.info(':::::::::::::::::::::Request Ends:::::::::::::::::::::')

    next()
  } catch (error) {
    next(error)
  }
}
