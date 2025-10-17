import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels"
//GETリクエストを処理する関数
export async function GET(request,{params}) {
    
    try{
        await connectDB();
        const { id } = await params;//分割代入でIDを取得
        const item = await ItemModel.findById(id);//指定されたIDのアイテムを取得
        return NextResponse.json({ message: "アイテム取得成功(SINGLE)", data: item });//成功メッセージとデータを返す
    }catch{
        return NextResponse.json({ message: "アイテム取得失敗(SINGLE)" });//失敗メッセージを返す
    }
}