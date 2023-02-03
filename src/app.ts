import express from 'express';
import { fileURLToPath } from 'url';
  
import fs from 'fs';
import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = express();

import cors from 'cors';

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
 
 

// ----  set and Add Middleware -- //

import expressLayouts from 'express-ejs-layouts';
import extendLayout from 'express-ejs-extend';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', extendLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));








import userRoute from './routes/userRoute';



 
import { LoginPage,RegisterPage } from './controllers/user/authController';
import { ChatPage } from './controllers/user/chatController';
import { ContactUsPage } from './controllers/user/contactUsController';
import { NotificationPage } from './controllers/user/notificationController';
import { ProfileSettingsPage } from './controllers/user/profileSettingsController';
import { WelcomePage } from './controllers/user/welcomeController';


import { CheckoutPage } from './controllers/shop/checkoutController';
import { OrderPage } from './controllers/shop/orderController';
import { ShopCategoryPage } from './controllers/shop/shopCategoryController';
import { ShopPage } from './controllers/shop/shopController';
import { SingleProductPage } from './controllers/shop/singleProductController';
import { WishlistPage } from './controllers/shop/wishlistController';
import { CartPage } from './controllers/shop/cartController';


app.use('/', userRoute);
app.use('/login', LoginPage);
app.use('/register', RegisterPage);
app.use('/chat', ChatPage);
app.use('/welcome', WelcomePage);
app.use('/profile-settings', ProfileSettingsPage);
app.use('/notification', NotificationPage);
app.use('/contact-us', ContactUsPage);




app.use('/shop', ShopPage);
app.use('/wishlist', WishlistPage);
app.use('/cart', CartPage);
app.use('/checkout', CheckoutPage);
app.use('/order', OrderPage);
app.use('/single-product', SingleProductPage);
app.use('/single-category', ShopCategoryPage);




app.get('/', (req, res) => {
  console.log('user');

  res.send('user');
});

export default app;
