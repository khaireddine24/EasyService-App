import dotenv from 'dotenv' // Charger les variables d'environnement





const VITE_URL = process.env.VITE_URL || `http://localhost:5173`;

const corsOptions = [VITE_URL];


export default corsOptions;