import express,{Request,Response,NextFunction} from 'express';
import { fileURLToPath } from 'url';
import flash from 'connect-flash' 
import fs from 'fs'; 
import path from 'path';
import createHttpError from "http-errors"

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
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24  },
  store: connectMongo.create({ mongoUrl: process.env.MONGO_URI })
}))

app.set('trust proxy', 1) // trust first proxy

app.use(flash());

import passport from "passport"
import passportConfig from './config/passportConfig'; 


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

passportConfig(passport);


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



import Routes from './routes';

Routes(app);



// 404 Handler
app.use((req:Request, res:Response, next:NextFunction) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});





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
