import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Items = ({ items = [], onAdd = () => {}, onShowItem = () => {} }) => {
  // Обработка и нормализация данных
  const normalizedItems = items.map(item => ({
    ...item,
    // Гарантируем, что price будет числом
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    // Fallback для изображения
    img: item.img || item.img_url || '/images/default-product.png',
    // Fallback для описания
    desc: item.desc || item.description || 'Описание отсутствует'
  }));

  return (
    <div className="items-grid">
      {normalizedItems.length > 0 ? (
        normalizedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onAdd={() => onAdd(item)}
            onShowItem={() => onShowItem(item)}
          />
        ))
      ) : (
        <div className="no-items-message">
          <p>Товары не найдены</p>
        </div>
      )}
    </div>
  );
};

// Проп-тайпы с валидацией
Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string,
      img_url: PropTypes.string,
      desc: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      category: PropTypes.string,
      opis: PropTypes.string,
      opic: PropTypes.string
    })
  ),
  onAdd: PropTypes.func,
  onShowItem: PropTypes.func
};

export default Items;