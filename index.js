
import dotenv from 'dotenv'
import { ConnectDB } from './src/database/database.js';
import { app } from './app.js';







dotenv.config({
  path: './.env',
})
  

ConnectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
