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

export const ItemModel = mongoose.models.Item || mongoose.model('Item', itemSchema);//すでにモデルが存在する場合はそれを使用し、存在しない場合は新たに作成
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);  //すでにモデルが存在する場合はそれを使用し、存在しない場合は新たに作成
