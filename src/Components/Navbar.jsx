import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { PiShoppingCart } from 'react-icons/pi';
import Order from './peges/Order';
import OrderForim from './peges/OrderForim';



const OrderList = ({ orders, onDelete }) => {
  const totalAmount = orders.reduce((sum, item) => sum + parseFloat(item.price) || 0, 0);

  return (
    <div>
      <h1 className='vas'>Ваш заказ</h1>
      <div className="line1"></div>
      {orders.map(item => (
        <Order key={item.id} onDelete={onDelete} item={item} />
      ))}
      <p className='summa'>
        Сумма: {new Intl.NumberFormat().format(totalAmount)}$
      </p>
      <OrderForim/>
          </div>
  );
};

const Navbar = ({ orders, onDelete }) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header>
      <div className='qwe'>
        <nav>
          <Link to="/" className='logo'>Sugar</Link>
          <ul className='nav'>
            <li>
            <PiShoppingCart onClick={() => setCartOpen(prev => !prev)} className={`$shop-cart-button ${cartOpen && styles.active}`} />
            </li>
            <li><NavLink to="/about">О нас</NavLink></li>
            <li><NavLink to="/">Каталог</NavLink></li>
            <li><NavLink to="/contsct">Контакты</NavLink></li>
            
          </ul>
        </nav>

        {cartOpen && (
          <div className='shop-cart'>
            {orders.length > 0 ? <OrderList orders={orders} onDelete={onDelete} /> : <div className='empty'><h2>Товаров нету</h2></div>}
          </div>
        )}
      {/* </div> */}
      </div>
    </header>
  );
};

export default Navbar;

