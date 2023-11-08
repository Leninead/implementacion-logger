
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

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
