import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div className='about'>
      

          
    <div className='verh'>
    <div className='qwerty'> </div>
    <h1 className='about-title fs-26 ls-1'>Никита Петров</h1>
    <h2 className='about-title fs-26 ls-1'>Шеф шоколатье</h2>
    <h3 className='fs-17'>Шеф шоколатье — это настоящий волшебник, который превращает обычные шоколадные плитки в произведения искусства. Он обладает уникальными знаниями и навыками, позволяющими создавать настоящие шедевры из шоколада.</h3>
    <h3 className='fs-17'>Кроме того, шеф шоколатье уделяет большое внимание качеству продукции. Он тщательно контролирует каждый этап производства, чтобы гарантировать соответствие шоколадных изделий самым высоким стандартам качества.</h3>
    </div>
<div className='niz'>
<div class="create-line"></div>

                <h1 className='abn'>О нас</h1>
                <div class="create-line"></div>
<div className='text'>
    <h3>Sugar-это компания, специализирующаяся на производстве уникальных шоколадных сладостей. Основанная группой энтузиастов, компания стремится создавать высококачественные продукты, сочетающие в себе традиции и инновации.</h3>
<h3>Sugar был создан после того, как группа друзей и родственников решила объединить свои усилия для создания собственного бизнеса. Они были вдохновлены любовью к шоколаду и желанием предложить потребителям нечто особенное.</h3>
<h3>Основные принципы работы компании:</h3>
<ul>
<li><h4>
использование только высококачественных ингредиентов;</h4>
</li>
<li><h4>
внимание к деталям и ручной труд;</h4>
</li>
<li><h4>
постоянное развитие и инновации;
</h4> </li>
<li><h4>забота об окружающей среде и использование экологически чистых материалов.</h4></li>
</ul>
<h3>
Sugar предлагает широкий ассортимент шоколадных изделий, включая шоколад, конфеты, пралине, трюфели, шоколадные пасты и многое другое. Все продукты изготавливаются с использованием натуральных ингредиентов и имеют неповторимый вкус.
</h3></div>
</div>   

</div>
  );
};

const App = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const addToOrder = (item) => {
    if (!orders.find(el => el.id === item.id)) {
      setOrders(prev => [...prev, item]);
    }
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(el => el.id !== id));
  };

  return (
    <div className='wrapper'>
      <Navbar orders={orders} onDelete={deleteOrder} />
      <About />
      <Footer />
    </div>
  );
};

export default App;