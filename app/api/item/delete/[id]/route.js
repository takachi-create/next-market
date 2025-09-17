import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels"
//DELETEリクエストを処理する関数
export async function DELETE(request,context){
    try{
        await connectDB();//データベースに接続
        await ItemModel.deleteOne({ _id: context.params.id });//指定されたIDのアイテムを削除
        return NextResponse.json({ message: "アイテム削除成功" });//成功メッセージを返す
    } catch{
        return NextResponse.json({ message: "アイテム削除失敗" });//失敗メッセージを返す
    }
}