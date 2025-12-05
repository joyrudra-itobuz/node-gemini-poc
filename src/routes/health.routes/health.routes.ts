import express from 'express'

import HealthController from '../../controller/health.controller'

const healthRouter = express.Router()
const healthController = new HealthController()

healthRouter.get('/health', healthController.getHealth)

export default healthRouter
