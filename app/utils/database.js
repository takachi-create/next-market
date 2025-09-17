import mongoose from 'mongoose';
//MongoDB接続関数
const connectDB = async () => {
  try{
    await mongoose.connect("mongodb+srv://takachishouta:mN8XA7egWAbiIoG1@cluster0.sf3vm9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("MongoDB connected")//接続成功メッセージ
  }catch{
    console.log("MongoDB connection error");//接続失敗メッセージ
    throw new Error("MongoDB connection error");
  }
}

export default connectDB;