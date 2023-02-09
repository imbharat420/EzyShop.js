/**
 * Routes
 */

import userRoute from '../routes/userRoute';


//User
 
import { LoginPage,LoginPost,LogoutHandler,RegisterPage, RegisterPost } from '../controllers/user/authController';
import { ChatPage } from '../controllers/user/chatController';
import { ContactUsPage } from '../controllers/user/contactUsController';
import { NotificationPage } from '../controllers/user/notificationController';
import { ProfileSettingsPage } from '../controllers/user/profileSettingsController';
import { WelcomePage } from '../controllers/user/welcomeController';

//shop
import { CheckoutPage } from '../controllers/shop/checkoutController';
import { OrderPage } from '../controllers/shop/orderController';
import { ShopCategoryPage } from '../controllers/shop/shopCategoryController';
import { ShopPage } from '../controllers/shop/shopController';
import { SingleProductPage } from '../controllers/shop/singleProductController';
import { WishlistPage } from '../controllers/shop/wishlistController';
import { CartPage } from '../controllers/shop/cartController';
import fileUpload from '../utils/fileUpload';
import { registerPostValidtor,LoginPostValidtor } from '../middlewares/UserValidation';


 


//Validation
import {ensureLoggedOut, ensureLoggedIn} from 'connect-ensure-login';



const  Routes =  function(app:any){
    // User
    app.get('/', userRoute);
    app.get('/login',ensureLoggedOut('/'), LoginPage);
    app.get('/register',ensureLoggedOut('/'), RegisterPage);
    app.get('/chat', ChatPage);
    app.get('/welcome', WelcomePage);
    app.get('/profile-settings',ensureLoggedIn("/"), ProfileSettingsPage);
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
}


export default Routes;