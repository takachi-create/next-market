import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "../../../utils/database";
import {UserModel} from "../../../utils/schemaModels"

export async function POST(request) {
  const json = await request.json();//リクエストボディをJSONとして解析
  
  try{
      await connectDB();
      const savedUserData = await UserModel.findOne({ email: json.email});//メールアドレスでユーザーを検索
      
      if(savedUserData){
        // ユーザーが存在する場合の処理

        if(json.password === savedUserData.password) {
          // パスワードが一致する場合の処理
          const secretKey = new TextEncoder().encode("my_secret_key");//署名に使用する秘密鍵
          const payload = { email:json.email };//トークンに含める情報
          const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256"}).setExpirationTime("24h").sign(secretKey);//トークンの有効期限を24時間に設定
          console.log(token);
          return NextResponse.json({ message: "login成功" , token: token });
        } else {
        // パスワードが一致しない場合の処理
        return NextResponse.json({ message: "login失敗：パスワードが間違っています" });
        }
      } else {
        // ユーザーが存在しない場合の処理
        return NextResponse.json({ message: "login失敗：ユーザーが存在しません" });
      }
  } catch {
    return NextResponse.json({ message: "login失敗" });
  }
}
