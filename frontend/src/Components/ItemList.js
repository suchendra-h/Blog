import React from "react";
import { Link } from "react-router-dom";
function ItemList({ items }) {
  console.log(items);
  return items.map((item, key) => (
    <Link key={key} className="article-list-item" to={`/article/${item.name}`}>
      <h3>{item.title}</h3>

      <p>{item.content[0].substring(0, 159)}...</p>
    </Link>
  ));
}
export default ItemList;
