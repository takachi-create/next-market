import Image from "next/image";//画像の最適化とレスポンシブ対応のためのNext.jsのコンポーネント
import Link from "next/link";//クライアントサイドのナビゲーションを可能にするNext.jsのコンポーネント

const Header = () => {
    return (
        <header>
            <div>
                <Link href="/">
                    <img src="/header.svg"  width={1330} height={148} priority="true" alt="ヘッダー画像"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/user/login">ログイン</Link> {/*ログインページへのリンク*/}
                    </li>
                    <li>
                        <Link href="/user/register">ユーザー登録</Link> {/*ユーザー登録ページへのリンク*/}
                    </li>
                    <li>
                        <Link href="/item/create">商品登録</Link> {/*商品登録ページへのリンク*/} 
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;
