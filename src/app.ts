import express from 'express';
import { fileURLToPath } from 'url';
import flash from 'connect-flash' 
import fs from 'fs'; 
import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = express();

import cors from 'cors';
//!Express AUTHENTICATION

import session from 'express-session';
import connectMongo from 'connect-mongo';
import methodOverride from 'method-override';


// ----  set and Add Middleware -- //
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: connectMongo.create({ mongoUrl: process.env.MONGO_URI })
}))
app.use(flash());

import passport from "passport"
import passportConfig from './config/passportConfig'; 


app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(methodOverride("_method"));



app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// Template Engine
import expressLayouts from 'express-ejs-layouts';
import extendLayout from 'express-ejs-extend';

app.engine('ejs', extendLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));






/**
 * Routes
 */

import userRoute from './routes/userRoute';


//User
 
import { LoginPage,LoginPost,LogoutHandler,RegisterPage, RegisterPost } from './controllers/user/authController';
import { ChatPage } from './controllers/user/chatController';
import { ContactUsPage } from './controllers/user/contactUsController';
import { NotificationPage } from './controllers/user/notificationController';
import { ProfileSettingsPage } from './controllers/user/profileSettingsController';
import { WelcomePage } from './controllers/user/welcomeController';

//shop
import { CheckoutPage } from './controllers/shop/checkoutController';
import { OrderPage } from './controllers/shop/orderController';
import { ShopCategoryPage } from './controllers/shop/shopCategoryController';
import { ShopPage } from './controllers/shop/shopController';
import { SingleProductPage } from './controllers/shop/singleProductController';
import { WishlistPage } from './controllers/shop/wishlistController';
import { CartPage } from './controllers/shop/cartController';
import fileUpload from './utils/fileUpload';
import { registerPostValidtor,LoginPostValidtor } from './middlewares/UserValidation';


 


//Validation
 import {ensureLoggedOut, ensureLoggedIn} from 'connect-ensure-login';
import { NextFunction } from 'express-serve-static-core';


// User
app.get('/', userRoute);
app.get('/login',ensureLoggedIn('/'), LoginPage);
app.get('/register',ensureLoggedIn('/'), RegisterPage);
app.get('/chat', ChatPage);
app.get('/welcome', WelcomePage);
app.get('/profile-settings',ensureLoggedOut("/login"), ProfileSettingsPage);
app.get('/notification', NotificationPage);
app.get('/contact-us', ContactUsPage);

app.get('/logout',ensureLoggedIn('/login'),LogoutHandler);


// POST
app.post('/register',fileUpload.single("file"),registerPostValidtor, RegisterPost);;
app.post('/login',LoginPostValidtor,LoginPost ); 

 


// Shop
app.get('/shop', ShopPage);
app.get('/wishlist', WishlistPage);
app.get('/cart', CartPage);
app.get('/checkout', CheckoutPage);
app.get('/order', OrderPage);
app.get('/single-product', SingleProductPage);
app.get('/shop-category', ShopCategoryPage);
 
 


app.get('*', (req, res) => {
  console.log('user');

  res.send('404');
});

export default app;


// function ensureAdmin(req, res, next) {
//   if (req.user.role === roles.admin) {
//     next();
//   } else {
//     req.flash('warning', 'you are not Authorized to see this route');
//     res.redirect('/');
//   }
// }

// function ensureModerator(req, res, next) {
//   if (req.user.role === roles.moderator) {
//     next();
//   } else {
//     req.flash('warning', 'you are not Authorized to see this route');
//     res.redirect('/');
//   }
// }
