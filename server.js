import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

// Настройка CORS
app.use(cors({
  origin: ['http://localhost:5175', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Подключение к PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qwe',
  password: '201273',
  port: 5432,
});

// Проверка подключения
pool.on('connect', () => console.log('✅ Подключено к PostgreSQL'));
pool.on('error', (err) => console.error('❌ Ошибка PostgreSQL:', err));

// Роут для получения всех товаров
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        id,
        title,
        description as desc,
        img_url as img,
        price::numeric,
        category,
        description as opis,
        'Хранить в холодильнике' as opic
      FROM product
    `);
    
    // Преобразуем price в число
    const products = rows.map(p => ({
      ...p,
      price: Number(p.price)
    }));
    
    res.json(products);
  } catch (err) {
    console.error('Ошибка при запросе товаров:', err);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});

// Роут для получения товаров по категории
app.get('/api/products/category/:category', async (req, res) => {
  const { category } = req.params;
  
  try {
    const { rows } = await pool.query(
      `SELECT 
        id,
        title,
        description as desc,
        img_url as img,
        price::numeric,
        category
       FROM product
       WHERE category = $1`,
      [category]
    );
    
    res.json(rows.map(p => ({ ...p, price: Number(p.price) })));
  } catch (err) {
    console.error(`Ошибка при запросе категории ${category}:`, err);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});