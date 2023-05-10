import { connect, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/publicwebsite");
    console.log("mongodb connected");
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
})();

const newSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = model("collection", newSchema);

export async function insertMany(data) {
  const salt = await bcrypt.genSalt();
  const hashedData = data.map(d => ({ ...d, password: bcrypt.hashSync(d.password, salt) }));
  return db.collection(collection).insertMany(hashedData);
}

export async function findOne(query) {
  const { password, ...rest } = query;
  const user = await db.collection(collection).findOne(rest);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (match) return { ...user, password: undefined };
  return null;
}
export default collection;
