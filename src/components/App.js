import React, { useState } from "react";


const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
  { id: 3, description: "Socks", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}



function Form({ AddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) return; // Ensure description is not empty

    const newItem = {
      id: Date.now(),
      description: description.trim(),
      quantity: Number(quantity), // Ensure quantity is a number
      packed: false,
    };

    AddItems(newItem); // Add the new item to the list

    // Reset the input fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <div>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Item.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}


function Item({ item, onDeleteItem, onUpdateItem }) {
  const itemStyle = item.packed ? { textDecoration: "line-through" } : {};

  return (
    <li style={itemStyle}>
      {item.quantity}x {item.description}
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}





function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}




function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      {packedPercentage === 100 ? (
        <em>You got everything!</em>
      ) : (
        <em>
          You have {totalItems} items on your list. You already packed {packedItems} ({packedPercentage}%).
        </em>
      )}
    </footer>
  );
}





function App() {
  const [items, setItems] = useState(initialItems); 

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);

  
  }
  function handleDeleteItem(id){
    setItems((prevItems)=>prevItems.filter((item)=>item.id !==id));
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  
  
  

  return (
    <div className="app">
      <Logo />
      <Form AddItems={handleAddItems} />
      <PackingList 
      items={items}
      onDeleteItem={handleDeleteItem}
      onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}


export default App;

// function Form() {
//   function handleSubmit(e) {
//     e.preventDefault();
//   }
  
// }

// function handleSubmit(e) {
//   e.preventDefault();
// }

// return (
//   <form className="add-form" onSubmit={handleSubmit}>
//     <h3>What do you need to pack?</h3>
//   </form>
// );

