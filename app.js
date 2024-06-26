const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const app = express();

const pathDirectory = path.join(__dirname, './public');
app.set('view engine', 'hbs');
app.use(express.static(pathDirectory));
dotenv.config({ path: './.env' });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
port = 3000;

app.listen(port, () => {
    console.log("Server started in 3000 ");
}) 