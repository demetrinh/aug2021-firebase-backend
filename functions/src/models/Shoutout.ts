import { ObjectId } from "mongodb";

export default interface Shoutout {
  _id?: ObjectId;
  title: string;
  author: string;
  message: string;
}
