import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.VITE_URL, credentials: true }));

app.use('/',(req,res)=>{
    res.send('EasyService BackEnd');
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
