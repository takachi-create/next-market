import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import {ItemModel} from "../../../utils/schemaModels"
//POSTリクエストを処理する関数
export async function POST(request) {
  const json = await request.json();//リクエストボディをJSONとして解析
  
  try{
      await connectDB();//データベースに接続
      await ItemModel.create(json);//新しいアイテムを作成
      return NextResponse.json({ message: "アイテム作成成功" });//成功メッセージを返す
  }catch{
      return NextResponse.json({ message: "アイテム作成失敗" });//失敗メッセージを返す
  }
}


