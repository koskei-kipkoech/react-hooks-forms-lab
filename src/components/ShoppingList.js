import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import itemData from "../data/items"

function ShoppingList() {
  const [items, setItems] = useState(itemData)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleSearchchange(event) {
    setSearchTerm(event.target.value);
  }
  const itemsToDisplay = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleItemsFormSubmit(newItem){
    setItems((prevItems) => [...prevItems, newItem])
  }
  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemsFormSubmit}/>
      <Filter onSearchChange={handleSearchchange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
