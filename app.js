require('dotenv').config();
const express = require("express");
const expressLayout = require("express-ejs-layouts"); // fix typo
const app = express();
const PORT = process.env.PORT || 5000; // fixed the PORT assignment

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
