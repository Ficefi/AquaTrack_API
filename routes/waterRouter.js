import express from 'express';
import {
  addWaterConsumption,
  getWaterConsumptionByDay,
  getWaterConsumptionByMonth,
  updateWaterConsumption,
} from '../controllers/waterControllers.js';

import { auth } from '../middlewares/authenticate.js';

// import validateBody from '../helpers/validateBody.js';

const waterRouter = express.Router();

waterRouter.post('/', auth, addWaterConsumption);

waterRouter.put('/:id', updateWaterConsumption);

waterRouter.get('/day/:id/:date', getWaterConsumptionByDay);

waterRouter.get('/month/:id/:year/:month', getWaterConsumptionByMonth);

waterRouter.delete('/:id');

export default waterRouter;
