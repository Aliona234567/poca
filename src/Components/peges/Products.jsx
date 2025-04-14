import { useGetProductsQuery } from '../api/productsApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch
  } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      console.error('Ошибка загрузки:', error);
      // Можно добавить отправку ошибки в систему мониторинга
    }
  }, [isError, error]);

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загружаем список товаров...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h2>Произошла ошибка</h2>
        <p>{error?.message || 'Не удалось загрузить данные'}</p>
        <div className="action-buttons">
          <button onClick={handleRetry}>Повторить попытку</button>
          <button onClick={() => navigate('/')}>На главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1>Каталог товаров</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}