"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

//認証状態を管理するカスタムフック
const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");// ローディング状態を管理するためのステート
    const router = useRouter();// Next.jsのuseRouterフックを使用して、ページのナビゲーションを制御

    useEffect(() => {// コンポーネントのマウント時に実行される副作用
      const checkToken = async () => {
        const token = localStorage.getItem('token');// ローカルストレージからトークンを取得
        // トークンが存在しない場合はログインページにリダイレクト
     if (!token) {
        router.push('/user/login');// ログインページにリダイレクト
     }
     try {
        const secretKey = new TextEncoder().encode("my_secret_key");// 環境変数からシークレットキーを取得し、エンコード
        const decodedJwt = await jwtVerify(token, secretKey);// トークンを検証
        setLoginUserEmail(decodedJwt.payload.email);// 検証が成功した場合、ユーザーのメールアドレスをステートに設定

     }catch {router.push('/user/login');}// エラーが発生した場合もログインページにリダイレクト
      }
      checkToken();
   },[router])
   return loginUserEmail;
}

export default useAuth;