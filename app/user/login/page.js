"use client";
import{ useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");//メールアドレスの状態を管理するためのstate
    const [password, setPassword] = useState("");//パスワードの状態を管理するためのstate
    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
        try {
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const jsonData = await response.json();
            console.log(jsonData);
            localStorage.setItem("token", jsonData.token);//ローカルストレージにトークンを保存
            alert(jsonData.message);
        } catch {
            alert("ログインに失敗しました");
        }
    };
    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required />
                <button >ログイン</button>
            </form>
        </div>
    );
};
export default Login;