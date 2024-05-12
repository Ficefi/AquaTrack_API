import { Water } from '../model/water.js';

export const addWaterConsumption = async (req, res) => {
  try {
    const { _id, consumedVolume } = req.body;
    console.log('ReqBody', _id);

    const waterRecord = await Water.create({ _id, consumedVolume });

    res.status(201).json(waterRecord);
  } catch (error) {
    console.error('Failed to add water consumption record:', error);
    res
      .status(500)
      .json({ message: 'Failed to add water consumption record', error });
  }
};

// export const addWaterConsumption = async (req, res) => {
//   try {
//     const { consumedVolume } = req.body;
//     const userId = req.user._id;
//     console.log('id', userId);

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $inc: { waterConsumption: consumedVolume } },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res
//       .status(201)
//       .json({ message: 'Water consumption added successfully', user });
//   } catch (error) {
//     console.error('Failed to add water consumption record:', error);
//     res
//       .status(500)
//       .json({ message: 'Failed to add water consumption record', error });
//   }
// };

export const updateWaterConsumption = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);

  const { consumedVolume } = req.body;
  console.log('volume', consumedVolume);

  try {
    const waterRecord = await Water.findByIdAndUpdate(
      id,
      { consumedVolume },
      { new: true }
    );

    console.log('waterRecord', waterRecord);
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

// export const getWaterConsumptionByDay = async (req, res) => {
//   const { _id, date } = req.params;

//   try {
//     // Перетворюємо рядок дати в об'єкт JavaScript Date
//     const searchDate = new Date(date);
//     console.log('date', searchDate);

//     // Отримуємо дані про спожиту воду за конкретний день для користувача з вказаним id
//     const waterConsumption = await Water.find({
//       userId: _id,
//       date: searchDate,
//     });

//     res.status(200).json(waterConsumption);
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch water consumption data for the day',
//       error: error.message,
//     });
//   }
// };

export const getWaterConsumptionByDay = async (req, res) => {
  const { id, date } = req.params;
  console.log('id', id);

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
    console.log('startOfDay', startOfDay);
    console.log('endOfDay', endOfDay);

    const waterConsumption = await Water.find({
      _id: id,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    console.log('waterCo', waterConsumption);

    res.status(200).json(waterConsumption);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch water consumption data for the day',
      error: error.message,
    });
  }
};

export const getWaterConsumptionByMonth = async (req, res) => {
  const { id, year, month } = req.params;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const waterConsumption = await Water.findOne({
      _id: id,
      date: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json(waterConsumption);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch water consumption data for the month',
      error,
    });
  }
};

export const deleteWaterRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecord = await Water.findByIdAndDelete(id);
    if (!deleteRecord) {
      return res
        .status(404)
        .json({ message: 'Water consumption record not found' });
    }
    res
      .status(200)
      .json({ message: 'Water consumption record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
