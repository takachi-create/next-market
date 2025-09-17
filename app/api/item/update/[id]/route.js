import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels"
//PUTリクエストを処理する関数
export async function PUT(request,context){
    const reqBody = await request.json();
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id );//指定されたIDのアイテムを取得
        if(singleItem.email === reqBody.email) {
           await ItemModel.updateOne({ _id: context.params.id }, reqBody);//指定されたIDのアイテムを更新
           return NextResponse.json({ message: "アイテム更新成功" });//成功メッセージを返す    
        } else {
           return NextResponse.json({ message: "アイテム更新失敗: メールアドレスが一致しません" });//失敗メッセージを返す
        }
    } catch{
        return NextResponse.json({ message: "アイテム更新失敗" });//失敗メッセージを返す
    }
}