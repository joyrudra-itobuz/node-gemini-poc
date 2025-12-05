import path from 'node:path'

export default {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  PUBLIC_PATH: path.join(process.cwd(), 'public'),
}
