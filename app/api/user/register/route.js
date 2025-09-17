import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import {UserModel} from "../../../utils/schemaModels"
//POSTリクエストを処理する関数
export async function POST(request) {
  const json = await request.json();//リクエストボディをJSONとして解析
  
  try{
      await connectDB();
      await UserModel.create(json);//新しいユーザーを作成
      return NextResponse.json({ message: "ユーザー登録成功" });
  }catch{
      return NextResponse.json({ message: "ユーザー登録失敗" });
  }
}
