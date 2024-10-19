// Require express et autre dépendances 
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updatePassword } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// Définitions des routes utilisateurs
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/password', verifyToken, updatePassword);

module.exports = router;
