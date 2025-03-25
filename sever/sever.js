import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routers';
import connectDatabase from './src/config/connectDatabase';


const app = express();
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: "POST, GET, PUT, DELETE",
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connectDatabase();

app.use('/', (req, res) => {res.send('Sever on ...')});

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
    console.log(`Sever on port ${listener.address().port}`);
});