import express from 'express'
const router = express.Router()

import {createStation} from '../controllers/stationController/createStationController.js'

router.post('/createStation',createStation)

export default router