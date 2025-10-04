import mongoose from 'mongoose';

//スキーマの定義
const { Schema } = mongoose

//アイテムスキーマの定義
const itemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});
//ユーザースキーマの定義
const userSchema = new Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

export const ItemModel = mongoose.models.Item || mongoose.model('Item', itemSchema);
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
