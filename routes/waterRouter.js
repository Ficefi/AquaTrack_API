import express from 'express';
import {
  addWaterConsumption,
  deleteWaterRecord,
  getWaterConsumptionByDay,
  getWaterConsumptionByMonth,
  updateWaterConsumption,
} from '../controllers/waterControllers.js';

// import { auth } from '../middlewares/authenticate.js';

// import validateBody from '../helpers/validateBody.js';

const waterRouter = express.Router();

waterRouter.post('/', addWaterConsumption);

waterRouter.put('/:id', updateWaterConsumption);

waterRouter.get('/day/:id/:date', getWaterConsumptionByDay);

waterRouter.get('/month/:id/:year/:month', getWaterConsumptionByMonth);

waterRouter.delete('/:id', deleteWaterRecord);

export default waterRouter;
