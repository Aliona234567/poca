import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ item, onAdd, onShowItem }) => {
  return (
    <div className="item-card">
      <img 
        src={item.img} 
        alt={item.title} 
        onClick={() => onShowItem(item)}
        className="item-image"
      />
      <h3 className="item-title">{item.title}</h3>
      <p className="item-desc">{item.desc}</p>
      <div className="item-price">
        {typeof item.price === 'number' 
          ? `Цена: ${item.price.toFixed(2)} ₽`
          : 'Цена не указана'}
      </div>
      <button 
        onClick={() => onAdd(item)} 
        className="add-to-cart-btn"
      >
        В корзину
      </button>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onShowItem: PropTypes.func.isRequired
};

export default Item;