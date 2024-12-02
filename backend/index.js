import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connect.js'; 
import corsOptions  from './config/corsOptions.js';
import authRoutes from './routes/authRoutes.js';
import prestataireRoutes from './routes/prestataireRoutes.js';
dotenv.config();


connectDB();
const app = express()

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/prestataire', prestataireRoutes);

const PORT = process.env.PORT || 5000;
app.use('/',(req,res)=>{
  res.send('EasyService BackEnd');
})



app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
