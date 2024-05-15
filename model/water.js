import { model, Schema } from 'mongoose';

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Water = model('Water', waterConsumptionSchema);
