
/*

Mocking y manejo de errores

Consigna

Se aplicará un módulo de mocking y un manejador de errores a tu servidor actual

Formato

Link al repositorio de github sin node_modules

Sugerencias
*Céntrate solo en los errores más comunes 
*Puedes revisar el documento de testing aquí: 

Aspectos a incluir
*Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’)

*Además, generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.


IMPLEMENTACION LOGGIN

Thank you for sharing the task requirements for your project. To fulfill these requirements, you need to implement logging in your existing Node.js project based on the Winston logger. Here's a step-by-step guide on how to accomplish this:

Define Logging Levels:

Define the following logging levels with the specified priority (from lowest to highest):
debug
http
info
warning
error
fatal
Implement Winston Logger:

Create two instances of Winston logger, one for development and one for production.
For the development logger, configure it to log from the "debug" level and above to the console.
For the production logger, configure it to log from the "info" level and above.
Configure the logger to log errors (from the "error" level and above) to a file named "errors.log."
Replace console.log():

Replace your existing console.log() statements with the appropriate log level methods of the Winston logger, e.g., logger.debug(), logger.info(), logger.error(), etc.
Add High-Value Logs:

Add log statements at key points in your server code to capture important information, such as errors, warnings, and other relevant data.
Create an /loggerTest Endpoint:

Create an API endpoint, /loggerTest, that can be used to test and demonstrate all the log levels (debug, http, info, warning, error, fatal). When you make requests to this endpoint, the corresponding log statements should be triggered in your server code.
Repository Link:

Ensure that you provide a link to the GitHub repository of your project, excluding the node_modules directory.
Testing:

You may want to review and ensure that you have already covered testing as per the previous deliverable.
By following these steps, you will be able to implement the required logging functionality into your Node.js application. Make sure to thoroughly test the logging behavior using the /loggerTest endpoint. Once completed, you can share the link to your GitHub repository for evaluation.

If you have any specific questions or need further assistance with any of these steps, please let me know.
*/


const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const initializePassport = require('./config/passport.config');
const configurePassport = require('./config/passport.config');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const productsRouter = require('./routes/products.router');
const cartRoutes = require('./routes/cart.router');
const usersRouter = require('./routes/users.router')
const mockingModule = require('./mocking.js');
const winston = require('winston');
const getLogger = require('./logger');

require('dotenv').config();

const path = require('path');

const app = express();

const authRouter = require('./routes/auth');

const connectDB = require('./db');

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parsing middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
initializePassport();

// Configure Passport
configurePassport();

// Use session
app.use(
  session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());

// JWT Authentication Route using .env
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    (req) => {
      if (req && req.cookies) {
        return req.cookies['jwt'];
      
      }
      return null;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET, // Use process.env.JWT_SECRET here
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);


app.get('/loggerTest', (req, res) => {
  req.log.debug('Debug log test');
  req.log.http('HTTP log test');
  req.log.info('Info log test');
  req.log.warning('Warning log test');
  req.log.error('Error log test');
  req.log.fatal('Fatal log test');

  res.send('Logs created in the console or errors.log');
});





// cart route
app.use('/cart', cartRoutes);


app.use('/products', productsRouter);

// Use the user routes
app.use('/users', usersRouter);

// authentication routes
app.use('/auth', authRouter);



// JWT Authentication Route
app.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
  const token = req.user.generateJWT();
  console.log('Token:', token); // Add this line to log the token
  res.json({ token });
});


app.get('/', (req, res) => {
  res.render('home'); // Render the home view when accessing '/'
});


//route for '/mockingproducts'
app.get('/mockingproducts', (req, res) => {
  const mockProducts = mockingModule.generateMockProducts();
  res.json(mockProducts);
});



// ... (previous code)

app.use((req, res, next) => {
  req.log = getLogger();
  next();
});

app.listen(8080, () => {
  const logger = getLogger();
  logger.debug('Server running on port 8080');
});
