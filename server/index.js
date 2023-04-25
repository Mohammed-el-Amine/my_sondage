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
    const { nom, prenom, dateNaissance, adresse, email, password, confirmPassword } = req.body;

    try {
        const user = await userCollection.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Le mot de passe et la confirmation du mot de passe doivent être identiques.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
        const user = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

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
        const user = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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

app.get('/sondages/:id', async (req, res) => {
    const sondageId = req.params.id;

    try {
        const sondagesCollection = mongoose.connection.collection('sondages');
        const sondage = await sondagesCollection.findOne({ _id: new mongoose.Types.ObjectId(sondageId) });

        if (!sondage) {
            return res.status(404).json({ message: 'Sondage non trouvé' });
        }

        res.status(200).json(sondage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du sondage.' });
    }
});

app.post('/sondages/:id/votes', async (req, res) => {

    const { id } = req.params;
    const { option } = req.body;
    const sondagesCollection = mongoose.connection.collection('sondages');
    const votesCollection = mongoose.connection.collection('votes');

    try {
        const sondage = await sondagesCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!sondage) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }

        const optionExists = sondage.options.some(opt => opt === option);
        if (!optionExists) {
            return res.status(400).json({ message: 'Option invalide.' });
        }

        const alreadyVoted = await votesCollection.findOne({ sondageId: id, id_du_sondeur: sondage.id_du_sondeur });
        if (alreadyVoted) {
            return res.status(400).json({ message: 'Vous avez déjà voté pour ce sondage.' });
        }

        const vote = {
            sondageId: id,
            option: option,
            id_du_sondeur: sondage.id_du_sondeur
        };
        await votesCollection.insertOne(vote);

        res.status(200).json({ message: 'Vote enregistré avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement du vote.' });
    }
});

app.get('/votes', async (req, res) => {
    try {
        const votesCollection = mongoose.connection.collection('votes');
        const votes = await votesCollection.find().toArray();;
        const votesBySondage = {};
        // console.log(votes)

        votes.forEach(vote => {
            if (!votesBySondage[vote.sondageId]) {
                votesBySondage[vote.sondageId] = [];
            }
            votesBySondage[vote.sondageId].push(vote);
        });

        res.status(200).json(votesBySondage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des votes pour chaque sondage.' });
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