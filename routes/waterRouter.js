import express from 'express';
import {
  addWaterConsumption,
  deleteWaterRecord,
  getWaterConsumptionByDay,
  getWaterConsumptionByMonth,
  updateWaterConsumption,
} from '../controllers/waterControllers.js';

import { auth } from '../middlewares/authenticate.js';

const waterRouter = express.Router();

waterRouter.post('/', auth, addWaterConsumption);

waterRouter.put('/:id', auth, updateWaterConsumption);

waterRouter.get('/day/:date', auth, getWaterConsumptionByDay);

waterRouter.get('/month-stats/:date', auth, getWaterConsumptionByMonth);

waterRouter.delete('/:id', auth, deleteWaterRecord);

export default waterRouter;
