"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import useAuth from "../../../utils/useAuth";

//商品編集ページのコンポーネント
const UpdateItem = ({ params }) => {//ReactのuseStateフックを使用して、フォームの各フィールドの状態を管理
    const { id } = use(params);//paramsはプロミスであるため、useフックを使用して解決
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const loginUserEmail = useAuth();//カスタムフックを使用して認証状態を取得
    const router = useRouter();//Next.jsのuseRouterフックを使用して、ページのナビゲーションを制御

    //商品情報を取得するための副作用フック
    useEffect(() => {
      const getSingleItem = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/readsingle/${id}`,{cache: 'no-store'});//キャッシュを使わない
        const json = await response.json();//JSON形式でレスポンスを取得
        const singleItem = await json.data;//データ部分を抽出
        setTitle(singleItem.title);//フォームの各フィールドにデータをセット
        setPrice(singleItem.price);
        setImage(singleItem.image);
        setDescription(singleItem.description);
        setEmail(singleItem.email);
      }

      getSingleItem(id)
    }, [id]//IDが変わるたびに実行
    )
    
    //フォームの送信を処理する関数
    const handleSubmit = async (e) => {
        e.preventDefault();//フォームのデフォルトの送信動作を防止
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/update/${id}`, {
                method: "PUT",//HTTPメソッドをPUTに設定
                headers: {
                    "Accept": "application/json",//サーバーがJSON形式のデータを受け入れることを示す
                    "Content-Type": "application/json",//送信するデータがJSON形式であることを示す
                    "Authorization": `Bearer ${localStorage.getItem("token")}`//認証トークンをヘッダーに含める
                },
                body: JSON.stringify({ title, price, image, description, email:loginUserEmail })//フォームデータをJSON形式で送信 表記はショートハンド構文
            });
            const json = await response.json();
            alert(json.message);
            router.push("/");//商品編集後にホームページにリダイレクト
            router.refresh();//ページをリフレッシュして最新のデータを表示
        }catch{
            alert("商品編集失敗");
        }
    }//フォームの送信を処理する関数
    if(loginUserEmail === email){
        return (
          <div>
              <h1 className="page-title">商品編集ページ</h1>
              <form onSubmit={handleSubmit}>{/*フォームの送信イベントにhandleSubmit関数をバインド*/}
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="商品名"  required/>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                  <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像URL" required/>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="商品説明" required rows={15}></textarea>
                  <button>編集</button>
              </form>
          </div>
        )
    }else{
        return <div>権限がありません</div>
    }
  }
export default UpdateItem