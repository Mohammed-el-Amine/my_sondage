const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Adresse email ou mot de passe incorrect.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Adresse email ou mot de passe incorrect.' });
        }

        res.status(200).json({ message: 'Connexion réussie.', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
});

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Retourner les informations de l'utilisateur
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur.' });
    }
});

app.post('/profile/:id/password', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mettre à jour le mot de passe de l'utilisateur
        await userCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: 'Mot de passe modifié avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la modification du mot de passe.' });
    }
});

app.post('/sondages', (req, res) => {
    const { title, description, options } = req.body;
    const { userId } = req.body;

    const newSondage = {
        id_du_sondeur: userId,
        titre: title,
        description: description,
        options: options,
    };

    const sondagesCollection = mongoose.connection.collection("sondages");

    sondagesCollection.insertOne(newSondage, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        console.log('Sondage créé avec succès :', result);
        res.status(201).send(result);

    });
});

app.get('/sondages', async (req, res) => {
    try {
        const sondagesCollection = mongoose.connection.collection("sondages");
        const sondages = await sondagesCollection.find().toArray();
        res.status(200).json(sondages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des sondages.' });
    }
});

app.use((req, res, next) => {
    const error = new Error('404 - Page non trouvée');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;