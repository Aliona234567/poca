// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import Items from './Items';
import Categoris from './Categoris';
import ShowFullItem from './ShowFullItem';
import Navbar from '../Navbar';
import Footer from './Footer';

const Home = () => {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState(null);

  // Загрузка товаров при монтировании
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productAPI.fetchAll();
        setItems(products);
        setCurrentItems(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Функция добавления в корзину
  const addToOrder = (item) => {
    if (!orders.find(el => el.id === item.id)) {
      setOrders(prev => [...prev, item]);
    }
  };

  // Функция удаления из корзины
  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(el => el.id !== id));
  };

  // Фильтрация по категориям
  const chooseCategory = async (category) => {
    setLoading(true);
    try {
      const products = category === 'all' 
        ? items 
        : await productAPI.fetchByCategory(category);
      setCurrentItems(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Просмотр полной информации о товаре
  const onShowItem = (item) => {
    setFullItem(item);
    setShowFullItem(!showFullItem);
  };

  // Состояния загрузки и ошибки
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Navbar orders={orders} onDelete={deleteOrder} />
      
      <div className='presentation'>
        {/* Баннер или промо-блок */}
      </div>

      <div className='catalog-container'>
        <h1 className='catalog-title'>Каталог</h1>
        <Categoris chooseCategory={chooseCategory} />
        
        {currentItems.length > 0 ? (
          <Items 
            items={currentItems} 
            onAdd={addToOrder} 
            onShowItem={onShowItem} 
          />
        ) : (
          <div className="no-products">
            <p>Товары в этой категории отсутствуют</p>
          </div>
        )}

        {showFullItem && (
          <ShowFullItem 
            item={fullItem} 
            onAdd={addToOrder} 
            onShowItem={onShowItem} 
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;