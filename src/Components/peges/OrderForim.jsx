import React, { useState } from 'react';

export const OrderForim = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    isAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="firstName"
        placeholder="Имя"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Фамилия"
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Адрес"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Почта"
        onChange={handleChange}
        required
      />
      <button className='sujbmit' type="submit">Заказать</button>
    </form>
  );
};
export default OrderForim

