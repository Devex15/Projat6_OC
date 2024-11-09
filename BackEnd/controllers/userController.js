const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    // Code pour l'enregistrement
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Enregistrer l'utilisateur dans la base de données avec hashedPassword

    try {
        const { email, password } = req.body;

        // On vérifie que l'adresse e-mail et le mot de passe sont fournis
        if (!email || !password) {
            return res.status(400).json({ message: "Veuillez fournir une adresse e-mail et un mot de passe." });
        }

        // On valide  la syntaxe de l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "L'adresse e-mail n'est pas valide." });
        }

        // On vérifie  si l'e-mail est déjà utilisé
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Cette adresse e-mail est déjà utilisée." });
        }

        // On hache  le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // On enregistre l'utilisateur dans la base de données
        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        // On renvoie une réponse que l'enregistrement a été fait avec succès
        res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer plus tard." });
    }
};

exports.loginUser = async (req, res) => {
    exports.loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // On vérifie si l'adresse e-mail et le mot de passe sont fournis
            if (!email || !password) {
                return res.status(400).json({ message: "Veuillez fournir une adresse e-mail et un mot de passe." });
            }
    
            // On vérifie grâce à une regex que l'adresse e-mail est valide 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "L'adresse e-mail saisie est invalide." });
            }
    
            // On vérifie si l'utilisateur existe dans la base de données
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ message: "Désolé, mais la combinaison identifiant et mot de passe est incorrecte." });
            }
    
            // On compare le mot de passe saisi avec le mot de passe haché dans la base de données
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Désolé, mais la combinaison identifiant et mot de passe est incorrecte." });
            }
    
            // Si le mot de passe est valide, on génère un jeton JWT
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET, // La clé secrète doit être stockée dans les variables d'environnement
                { expiresIn: '1h' }
            );
    
            // On renvoie une réponse réussie avec le jeton
            res.status(200).json({
                message: "Connexion réussie !",
                token: token
            });
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer plus tard." });
        }
    };
    
};

//exports.updatePassword = async (req, res) => {
    // Code pour la mise à jour du mot de passe à faire
    // Utiliser bcrypt pour hacher le nouveau mot de passe à faire
//};   - > non valable : vu dans le login
