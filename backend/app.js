//import npm installed packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');// import route files
const { ValidationError } = require('sequelize'); // import validation error for sequelize

const { environment } = require('./config');
const isProduction = environment === 'production';// variable will be true if environment is set to production

const app = express(); // initialize express

app.use(morgan('dev'));// connect morgan middleware for logging info about req and res

app.use(cookieParser());// middleware for parsing cookies
app.use(express.urlencoded({ extended: false })); //for AWS set up
app.use(express.json());// middleware for parsing JSON bodies of requests with content-type of application/json

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        // let error2 = {}
        err.errors = err.errors.map((e) => e.message);
        // err.errors.forEach((e) => error2[`${e.path}`] = e.message);
        // err.errors = error2
        err.title = 'Validation error';
        // err.message = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        // title: err.title || 'Server Error', // remove error title
        message: err.message,
        errors: err.errors,
        statusCode: err.status
        // stack: isProduction ? null : err.stack // remove stack
    });
});



module.exports = app; // export the app
