import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import {ItemModel} from "../../../utils/schemaModels"
//GETリクエストを処理する関数
export async function GET() {
    try{
        await connectDB();
        const allitems = await ItemModel.find();//すべてのアイテムを取得
        return NextResponse.json({ message: "アイテム取得成功(ALL)", allitems: allitems });//成功メッセージとデータを返す
    }catch{
        return NextResponse.json({ message: "アイテム取得失敗(ALL)" });//失敗メッセージを返す
    }
}
export const revalidate = 0; // 0秒ごとに再検証