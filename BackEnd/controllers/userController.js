const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    // Code pour l'enregistrement
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Enregistrez l'utilisateur dans la base de données avec hashedPassword
};

exports.loginUser = async (req, res) => {
    // Code pour la connexion de l'utilisateur
    // Vérifiez le mot de passe avec bcrypt.compare
};

exports.updatePassword = async (req, res) => {
    // Code pour la mise à jour du mot de passe
    // Utilisez bcrypt pour hacher le nouveau mot de passe
};
