const express = require('express');
const session = require('express-session');
const bodyParser = require ('body-parser');
const path = require ('path');
const flash = require('req-flash');
const app = express();


//lokator file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');

//konfiq library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//konfiq library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 't@1k0ch3ng',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))
app.use(flash());

app.use(express.static(path.join(__dirname,'public')));

//setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', appRoutes);





//port
app.listen(3000, () => {
    console.log("server jalan");
});