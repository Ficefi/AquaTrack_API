import { Water } from '../model/water.js';

async function addWater(data, owner) {
  const waterRecord = await Water.create({ ...data, owner });
  return waterRecord;
}

async function getWaterConsumptionByDate(startOfDay, endOfDay, owner) {
  const waterConsumption = await Water.find({
    owner,
    date: { $gte: startOfDay, $lt: endOfDay },
  });
  return waterConsumption;
}

async function fetchWaterConsumptionByMonth(startDate, endDate, owner) {
  const waterConsumption = await Water.find({
    owner,
    date: { $gte: startDate, $lte: endDate },
  });
  return waterConsumption;
}

async function deleteRecordByIdAndOwner(id, owner) {
  try {
    const deleteRecord = await Water.findOneAndDelete({
      _id: id,
      owner,
    });

    return deleteRecord;
  } catch (error) {
    throw error;
  }
}

export {
  addWater,
  getWaterConsumptionByDate,
  fetchWaterConsumptionByMonth,
  deleteRecordByIdAndOwner,
};
