import createServer from './server/server'

async function bootstrap() {
  console.info('Bootstrapping application...')
  createServer()
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error)
  process.exit(1)
})
