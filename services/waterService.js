import { Water } from '../model/water.js';

async function addWater(data, owner) {
  const waterRecord = await Water.create({ ...data, owner });
  return waterRecord;
}

async function updateWaterById(id, owner, data) {
  const waterRecord = await Water.findByIdAndUpdate(
    id,
    { ...data, owner },
    {
      new: true,
    }
  );
  return waterRecord;
}

async function getWaterConsumptionByDate(id, startOfDay, endOfDay, owner) {
  const waterConsumption = await Water.find({
    _id: id,
    owner,
    date: { $gte: startOfDay, $lt: endOfDay },
  });
  return waterConsumption;
}

async function fetchWaterConsumptionByMonth(id, startDate, endDate, owner) {
  const waterConsumption = await Water.find({
    _id: id,
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
    console.log('idRE', id);
    console.log('ownerRE', owner);
    console.log('deleteRecord', deleteRecord);
    return deleteRecord;
  } catch (error) {
    throw error;
  }
}

export {
  addWater,
  updateWaterById,
  getWaterConsumptionByDate,
  fetchWaterConsumptionByMonth,
  deleteRecordByIdAndOwner,
};
