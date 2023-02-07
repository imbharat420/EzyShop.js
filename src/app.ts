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

// ----  set and Add Middleware -- //

import expressLayouts from 'express-ejs-layouts';
import extendLayout from 'express-ejs-extend';

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', extendLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));








import userRoute from './routes/userRoute';


//User
 
import { LoginPage,LoginPost,RegisterPage, RegisterPost } from './controllers/user/authController';
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
import { registerPostValidtor } from './middlewares/UserValidation';



//Validation


// User
app.get('/', userRoute);
app.get('/login', LoginPage);
app.get('/register', RegisterPage);
app.get('/chat', ChatPage);
app.get('/welcome', WelcomePage);
app.get('/profile-settings', ProfileSettingsPage);
app.get('/notification', NotificationPage);
app.get('/contact-us', ContactUsPage);

// POST
app.post('/register',fileUpload.single("file"),registerPostValidtor, RegisterPost);;
app.post('/login', LoginPost); 
  
 
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
