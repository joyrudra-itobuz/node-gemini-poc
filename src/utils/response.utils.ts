import { format } from 'date-fns'

export class ApiResponse<T = unknown> {
  message: string
  success: boolean
  data?: T
  timestamp: string

  constructor(message: string, success: boolean, data?: T) {
    this.message = message
    this.success = success
    this.timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    if (data !== undefined) {
      this.data = data
    }
  }

  static success<T>(message: string, data?: T) {
    return new ApiResponse<T>(message, true, data)
  }

  static error(message: string) {
    return new ApiResponse(message, false)
  }
}
