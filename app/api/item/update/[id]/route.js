import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels"
//PUTリクエストを処理する関数
export async function PUT(request,{params}){
    const reqBody = await request.json();
    try{
        await connectDB();
        const { id } = await params;
        const singleItem = await ItemModel.findById(id);//指定されたIDのアイテムを取得
        if(singleItem.email === reqBody.email) {//リクエストボディのメールアドレスとアイテムのメールアドレスが一致する場合に更新を許可
           await ItemModel.updateOne({ _id: id }, reqBody);//指定されたIDのアイテムを更新
           return NextResponse.json({ message: "アイテム更新成功" });//成功メッセージを返す    
        } else {
           return NextResponse.json({ message: "アイテム更新失敗: メールアドレスが一致しません" });//失敗メッセージを返す
        }
    } catch{
        return NextResponse.json({ message: "アイテム更新失敗" });//失敗メッセージを返す
    }
}