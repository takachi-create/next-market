import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels"
//GETリクエストを処理する関数
export async function GET(request,context) {
    
    try{
        await connectDB();
        const item = await ItemModel.findById(context.params.id);//指定されたIDのアイテムを取得
        return NextResponse.json({ message: "アイテム取得成功(SINGLE)", data: item });//成功メッセージとデータを返す
    }catch{
        return NextResponse.json({ message: "アイテム取得失敗(SINGLE)" });//失敗メッセージを返す
    }
}