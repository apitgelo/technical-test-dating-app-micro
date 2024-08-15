import mongoose, { Schema } from "mongoose";
import { ProfileInterface } from "../interfaces/profile-interface";

const ProfileSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    photos: {
      type: [String],
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

ProfileSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

export default mongoose.model<ProfileInterface>("Profile", ProfileSchema);
