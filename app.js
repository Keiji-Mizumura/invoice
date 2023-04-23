const path = require('path');

// Express
const express = require('express');
const bodyParser = require('body-parser');

// Session
const session = require('express-session');

// Mongo DB
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://keiji:iHC9mocDXxdIWtiK@cluster0.fmmiiia.mongodb.net/invoice';

// Application
const app = express();

// Store for sessions
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// View Engine

app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes

const invoiceRoutes = require('./routes/invoice');

const errorRoutes = require('./routes/error');

// Helper Middlewares

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(invoiceRoutes);

app.use(errorRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
