// ShowFullItem.js
import React from 'react';

const ShowFullItem = ({ item, onShowItem, onAdd }) => {
  return (
    <div className='full-item'>
      <div className='qwe'>
        <img 
          src={`./img/${item.img}`} 
          onClick={() => onShowItem(item)} 
          alt={item.title} 
        />
      </div>
      <div className='ewq'>
        <h2 className='textlr'>{item.title}</h2>
        <p className='textlr2'>{item.desc}</p>
        <h2>Состав</h2>
        <p className='cvb'>{item.opis}</p>
        <h2>Условия хранения</h2>
        <p className='cvb'>{item.opic}</p>
        <b>Цена: {item.price}$</b>
        <button className='add-to-cart1' onClick={() => onAdd(item)}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ShowFullItem;