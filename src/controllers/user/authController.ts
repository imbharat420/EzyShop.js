import {Request,Response} from "express"
import User from "../../models/userModel";
import {IUser} from "../../types"



/**
 * Register 
 */

const RegisterPage = (req:Request, res:Response) => {
  res.render('register');
};
 

const RegisterPost = async (req:Request, res:Response) => {
  let {
    file,
    body:{name,email,password}} = req
    
    try{
      let user = await User.find({email});
      console.log({name,email,password},file,user);
      if (user.length) {  
        return res.render('register',{errors:"User already exist"});
      }
      console.log("new user creating");
      let newUser =  new User({
        name,
        email,
        password,
        gender:"Male",
        avatar:file!?.filename,
        isAdmin:false,
      }).save()
      .then((user:IUser) => {
        console.log({user});
        req.flash('success', 'User created successfully');
        return res.redirect('/login');
      })
      .catch((err:any) => {
        console.log(err);
        req.flash('error', 'Error');
      });
  
    }catch(err){
      console.log(err);
      req.flash('error', 'Error');
    }
};

 
  

/**
 * LOGIN 
 */

const LoginPage = (req:Request, res:Response) => {
  res.render('login');
};


const LoginPost = (req:Request, res:Response) => {
  

  res.render('login');
};





export { RegisterPage,LoginPage,LoginPost,RegisterPost };
