import dotenv from 'dotenv';
import express from 'express'; 
import ConnectDB from './ConnectDB.js'; 
import router from './Router.js';
import cors from 'cors';

dotenv.config(); // Configure dotenv to load environment variables


const app = express(); 
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', router);

// Connect to the database and start the server
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to the port http://localhost:${PORT}/`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});
