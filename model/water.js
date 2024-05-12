import { model, Schema } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

const waterConsumptionSchema = new Schema(
  {
    consumedVolume: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// waterConsumptionSchema.pre('save', async function (next) {
//   if (!this.userId) {
//     this.userId = uuidv4();
//   }
//   next();
// });

export const Water = model('Water', waterConsumptionSchema);
