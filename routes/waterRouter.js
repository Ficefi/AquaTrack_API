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

waterRouter.get('/day/:id/:date', auth, getWaterConsumptionByDay);

waterRouter.get('/month/:id/:year/:month', auth, getWaterConsumptionByMonth);

waterRouter.delete('/:id', auth, deleteWaterRecord);

export default waterRouter;
