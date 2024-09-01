import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['flat', 'building', 'plot', 'bungalow'],
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['sell', 'rent'],
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model('Property', propertySchema);
