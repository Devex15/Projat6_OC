const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement de Express
const app = express();

/**
 * MIDDLEWARES
 */
// Configuration cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Parse le body des requetes en json
app.use(express.json());

/**
 * ROUTES
 */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;