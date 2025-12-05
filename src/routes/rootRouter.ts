import express from 'express'

import healthRoutes from './health.routes/health.routes'

const router = express.Router()

router.use('/', healthRoutes)

export default router
