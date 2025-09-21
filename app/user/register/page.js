"use client"
import{ useState } from "react";

const Register = () => {
  const [name, setName] = useState("");//名前の状態を管理するためのstate
  const [email, setEmail] = useState("");//メールアドレスの状態を管理するためのstate
  const [password, setPassword] = useState("");//パスワードの状態を管理するためのstate
  
  const handleSubmit = () =>{
    try{
      fetch("http://localhost:3000/api/user/register",{//fetch関数を使ってAPIエンドポイントにPOSTリクエストを送信
        method:"POST",//HTTPメソッドを指定
        headers:{//リクエストヘッダーを指定
          "Accept":"application/json",//サーバーにJSON形式のレスポンスを期待することを示す
          "Content-Type":"application/json"//リクエストボディの形式がJSONであることを示す
         },
        body: JSON.stringify({//リクエストボディに送信するデータをJSON形式に変換
          name:name,
          email:email,
          password:password
        })
      })
    }
    catch{
      alert("登録に失敗しました")
    }
  };
  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name}//inputの値をnameのstateにバインド
          onChange={(e) => {//inputの値が変更されたときに呼び出されるイベントハンドラ
            setName(e.target.value) //inputの値が変更されたときにnameのstateを更新
          }} 
            type="text" name="name" placeholder="名前" required/>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" placeholder="メールアドレス" required/>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>

  );
};
export default Register;
