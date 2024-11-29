import dotenv from 'dotenv' // Charger les variables d'environnement

const VITE_URL = process.env.VITE_URL || `http://localhost:${PORT}`;

const corsOptions = [VITE_URL];


module.exports = corsOptions;