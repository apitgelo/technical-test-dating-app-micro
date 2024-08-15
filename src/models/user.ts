import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/user-interface";

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

export default mongoose.model<UserInterface>("User", UserSchema);
