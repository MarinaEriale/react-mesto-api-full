require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { errors } = require('celebrate');
const crypto = require('crypto');
const userRoutes = require('./routes/users'); // импортируем роутер
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const validateUser = require('./middlewares/validateUser');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.post('/signup', validateUser, createUser);

app.post('/signin', validateUser, login);

app.use(auth);

app.use('/', userRoutes);

app.use('/', cardRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
