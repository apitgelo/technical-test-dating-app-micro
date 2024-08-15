import { Document } from "mongoose";

export interface ProfileInterface extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  bio: string;
  photos: string[];
  location: string;
  interests: string[];
}
