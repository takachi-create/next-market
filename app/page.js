import Link from "next/link";
import image from "next/image";

//APIから全商品のデータを取得
const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall", { cache: 'no-store' });
  const json = await response.json();
  const allitems = json.allitems;
  return allitems;
}
//全商品のデータを表示
const ReadAllItems = async() => {
  const allitems = await getAllItems();
  
  return (
    <div>      
      {allitems.map(item => //全商品のデータをループで表示(.mapは配列の各要素に対して関数を実行し、新しい配列を生成)
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>{/*各商品へのリンク key={item._id}はユニークな識別子として使用されます*/}
          <img src={item.image} width={750} height={500} alt={item.title} priority="true"/>
          <div>
           <h2>{item.price}</h2>
           <h3>{item.title}</h3>
           <p>{item.description.substring(0, 100)}...</p>
          </div>
        </Link>
       )   
     }
      
    </div>
  );
};
export default ReadAllItems;//