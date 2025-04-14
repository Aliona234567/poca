import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productsApi'; // Проверьте путь

export default function ProductDetail() {
  const { id } = useParams();
  
  const { 
    data: product, 
    isLoading, 
    isError,
    error 
  } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className="loading">Загрузка товара...</div>;
  }

  if (isError) {
    return (
      <div className="error">
        Ошибка загрузки: {error.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="product-detail">
      <img 
        src={`/images/${product.img_url}`} 
        alt={product.title}
        onError={(e) => {
          e.target.src = '/images/placeholder.jpg';
        }}
      />
      <h1>{product.title}</h1>
      <p className="price">{product.price} ₽</p>
      <p className="description">{product.description}</p>
      <div className="storage-info">
        <h3>Условия хранения:</h3>
        <p>Хранить в холодильнике при температуре не выше +12°C</p>
      </div>
      <button className="add-to-cart">Добавить в корзину</button>
    </div>
  );
}