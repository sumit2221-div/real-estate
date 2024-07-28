import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './src/database/database.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

dotenv.config({
    path : "./.env"
})
ConnectDB()

// Routes
app.use('/', (req,res)=> {
    res.json("hello")

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
