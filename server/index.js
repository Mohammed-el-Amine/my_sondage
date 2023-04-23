const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Votre URI de connexion MongoDB
const uri = "mongodb+srv://test:test@sondage.bedthyv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connexion réussie à MongoDB !');
        app.listen(3000, () => {
            console.log('Serveur démarré sur le port 3000');
        });
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });

const userCollection = mongoose.connection.collection("users");

// Routes

app.post('/signup', async (req, res) => {
    // Extraire les données du corps de la requête
    const { nom, prenom, dateNaissance, adresse, email, password, confirmPassword } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const user = await userCollection.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Vérifier si le mot de passe et la confirmation du mot de passe sont identiques
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Le mot de passe et la confirmation du mot de passe doivent être identiques.' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = { nom, prenom, dateNaissance, adresse, email, password: hashedPassword };
        await userCollection.insertOne(newUser);

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
});

// Gestion d'erreur 404
app.use((req, res, next) => {
    const error = new Error('404 - Page non trouvée');
    error.status = 404;
    next(error);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;