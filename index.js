
import dotenv from 'dotenv'
import { ConnectDB } from './src/database/database.js';
import { app } from './app.js';



const PORT = process.env.PORT;




dotenv.config({
    path : "./.env"
})
ConnectDB()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
