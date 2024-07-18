import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import phonesRoutes from './routes/phonesRoutes.js';

dotenv.config();


const mongoUri = process.env.MONGO_URI;

const app = express();
const PORT = 3001;

// Configuration de NextCors pour toutes les routes
app.use(cors());
/*app.get('/', (req, res) => {
    res.json({name: 'SA FONCTIONNE'});
});*/

app.use(bodyParser.json());

//Modification du DNS en utilisant le DNS public de google pour pouvoir se connecter à mongoDB.
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error) => console.log('Connexion à MongoDB échouée !', error));


app.use('/api/phones', phonesRoutes);

app.listen(PORT, () => console.log(`Le serveur est en cours sur le port ${PORT}`));
