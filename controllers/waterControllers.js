import {
  addWater,
  deleteRecordByIdAndOwner,
  fetchWaterConsumptionByMonth,
  getWaterConsumptionByDate,
  updateWaterById,
} from '../services/waterService.js';

export const addWaterConsumption = async (req, res) => {
  try {
    const { consumedVolume } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User information missing' });
    }
    const owner = req.user._id;

    const newRecord = await addWater({ consumedVolume }, owner);

    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Failed to add water consumption record:', error);
    res.status(500).json({
      message: 'Failed to add water consumption record',
      error: error.message,
    });
  }
};

export const updateWaterConsumption = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    return res
      .status(400)
      .json({ message: 'Body must have at least one field' });
  }
  const { id } = req.params;
  const { _id: owner } = req.user;

  try {
    const waterRecord = await updateWaterById(id, owner, req.body);

    if (!waterRecord) {
      return res
        .status(404)
        .json({ message: 'Water consumption record not found' });
    }
    res.status(200).json(waterRecord);
  } catch (error) {
    console.error('Failed to update water consumption record:', error);
    res
      .status(500)
      .json({ message: 'Failed to update water consumption record', error });
  }
};

export const getWaterConsumptionByDay = async (req, res) => {
  const { date } = req.params;
  if (!date) {
    return res.status(400).json({ message: 'Missing params' });
  }

  try {
    const searchDate = new Date(date);
    const startOfDay = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth(),
      searchDate.getDate()
    );
    const endOfDay = new Date(
      searchDate.getFullYear(),
      searchDate.getMonth(),
      searchDate.getDate() + 1
    );

    const { _id: owner } = req.user;
    const waterConsumption = await getWaterConsumptionByDate(
      startOfDay,
      endOfDay,
      owner
    );

    res.status(200).json(waterConsumption);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch water consumption data for the day',
      error: error.message,
    });
  }
};

export const getWaterConsumptionByMonth = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({
      message: 'Missing required parameter: date',
    });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).json({
      message: 'Invalid date format',
    });
  }

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;

  if (month < 1 || month > 12) {
    return res.status(400).json({
      message: 'Month must be in the range of 1 to 12',
    });
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const { _id: owner } = req.user;
    const waterConsumption = await fetchWaterConsumptionByMonth(
      startDate,
      endDate,
      owner
    );

    res.status(200).json(waterConsumption);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch water consumption data for the month',
      error: error.message,
    });
  }
};

export const deleteWaterRecord = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const { _id: owner } = req.user;
    console.log('owner', owner);

    const deleteRecord = await deleteRecordByIdAndOwner(id, owner);

    if (!deleteRecord) {
      return res
        .status(404)
        .json({ message: 'Water consumption record not found' });
    }

    res
      .status(200)
      .json({ message: 'Water consumption record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
