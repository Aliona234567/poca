import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

const Order = ({ item, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <div className='item'>
      <img src={`./img/${item.img}`} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.desc}</p>

      <TiDeleteOutline className='delete-icon' onClick={() => onDelete(item.id)} />
      <div className='quantity-controls'>
       
      </div>
      <b>Цена: {item.price * quantity}$</b>
    </div>
  );
};

export default Order;