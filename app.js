const required = ["JWT_SECRET", "MONGO_URI", "PORT", "ADMIN_EM", "ADMIN_PW"];

for (const key of required) {
    if (!process.env[key]) {
        console.error(`Missing env variable: ${key}`);
        process.exit(1);
    }
}

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

//routes
const regRoute = require('./routes/regRoute');
app.use('/user', regRoute);

const logRoute = require('./routes/loginRoute');
app.use('/auth', logRoute);

const tokenRoute = require('./routes/tokenRoute');
app.use('/token', tokenRoute);

const addToFavourite = require('./routes/favouritesRoute');
app.use('/fav', addToFavourite);


const PORT = process.env.PORT;

//connecting db and creating admin
const connectDB = require('./configs/dbConfig');
const createAdmin = require('./scripts/createAdmin');

const start = async () => {
    await connectDB();
    await createAdmin();

    app.listen(PORT, () => {
        console.log(`Server is up and hosted on port ${PORT}`);
    })
}

start();
