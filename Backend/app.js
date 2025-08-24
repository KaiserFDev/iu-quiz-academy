require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const registerRoutes = require('./routes');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const authenticateToken = require('./middlewares/authenticateToken'); 

const app = express();

// CORS-Middleware ganz am Anfang
app.use(cors({
  origin: 'https://iu-quiz-academy-frontend.onrender.com',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
 // allowedHeaders: 'Content-Type,Authorization'
}));

// Preflight-Requests explizit beantworten
app.options('*', cors({
  origin: 'https://iu-quiz-academy-frontend.onrender.com',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
 // allowedHeaders: 'Content-Type,Authorization'
}));

app.use(requestLogger);
app.use(express.json());

registerRoutes(app); // Hier sollten Router inkl. AuthMiddleware korrekt gemountet sein

// Health-Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error Handler nach allen Routen
app.use(errorHandler);

module.exports = app;
