import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// ミドルウェア関数
export async function middleware(request) {
    const token = await request.headers.get("authorization")?.split(" ")[1];//リクエストヘッダーからトークンを取得
    if (!token) {
        return NextResponse.json({ message: "認証エラー: トークンが必要です" });//トークンがない場合、エラーメッセージを返す
    }
    try {
        const secretKey = new TextEncoder().encode("my_secret_key")//シークレットキーをエンコード
        //const decodedJwt = await jwtVerify(token, secretKey);//トークンを検証
        
        return NextResponse.next();//トークンが有効な場合、リクエストを次に進める
    } catch {
        return NextResponse.json({ message: "認証エラー: トークンが無効です" });//トークンが無効な場合、エラーメッセージを返す
    }
}
// ミドルウェアの設定
export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
};