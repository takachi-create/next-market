import Image from "next/image";


const getSingleItem = async (id) => {
   const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,{cache: 'no-store'});//キャッシュを使わない
    const json = await response.json();//JSON形式でレスポンスを取得
    const singleItem = await json.data;//データ部分を抽出
    return singleItem;
}
const ReadSingleItem = async({params}) => {
    const { id } = await params;//URLパラメータからIDを取得
    const singleItem = await getSingleItem(id)//IDに基づいて単一商品のデータを取得
    console.log("ログ:", singleItem);
    return (
        <div>
            <div>
                <Image src={singleItem.image} alt="商品画像" width={700} height={500}/>
            </div>
            <div>
                <h2>{singleItem.title}</h2>
                <h3>{singleItem.price}</h3>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
        </div>
    )
}

export default ReadSingleItem