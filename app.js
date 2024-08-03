
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import authRoute from "./src/routes/user.route.js"
import PropertyRoute from "./src/routes/property.route.js"
import FavRoute from "./src/routes/favorite.route.js"

app.use("/api/auth", authRoute)
app.use("/api/property", PropertyRoute)
app.use("/api/Favorite",FavRoute)
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Server is up and running!' });
});

export { app };
