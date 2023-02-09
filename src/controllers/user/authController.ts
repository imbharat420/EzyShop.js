import {Request,Response} from "express"
import User from "../../models/userModel";
import {IUser} from "../../types"
import {getFindUserQuery} from "./utils"
import passport from "passport"

/**
 * Register 
 */

const RegisterPage = (req:Request, res:Response) => {
  res.render('register');
};
 

const RegisterPost = async (req:Request, res:Response) => {
  let {
    file,
    body:{username,email,password}} = req
    
    try{
      let user = await User.find({email});
      console.log({username,email,password},file,user);
      if (user.length) {  
        console.log("user already exist")
        return res.render('register',{errors:[{msg:"User already exist"},],data:{username,email,password}});
      }
      console.log("new user creating");
      let newUser =  new User({
        username,
        email,
        password,
        gender:"Male",
        avatar:file!?.filename,
        isAdmin:false,
      }).save()
      
      return res.redirect('/login');
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


const LoginPost = async (req:Request, res:Response) => {
   let {body:{username,password}} = req
    console.log({username,password})
    try{

      //https://stackoverflow.com/a/30882574/12071002  
      passport.authenticate('local',function(err,user,info){
          if (err) { return res.render("login",{errors:[{msg:'An error occuredd'}]}) }
          if (!user) { 
              res.render("login",{errors:[{msg:'An error occuredd'}]})
              return;
          }else{
            req.login(user, function(error) {
                 if (error){
                   console.log("Error in login: ", error);
                   return res.render("login",{errors:[{msg:'An error occuredd'}]}) 
                 }
                 req.flash('success','Login successful');
                 return  res.redirect("/") 
             });
          }
        })(req, res);    
    }catch(err:any){
      console.log(err);
      return res.render('/login',{
        errors:[{msg:err},],
      });
    }
};



const LogoutHandler = (req:Request, res:Response) => { 
  req.logout(err => {
        if (err)  req.flash('success', err);
        // res.status(http.statusCodes.NO_CONTENT).end()
        res.locals.currentUser = null
        req.flash('success', 'You are logged out!');
        return res.redirect('/welcome');
    })
  
}

export { RegisterPage,LoginPage,LoginPost,RegisterPost,LogoutHandler };


/*
req.flash("success","Login Successfully");
console.log(err,user,info);
return res.redirect("/");



let user = await User.find(getFindUserQuery(username)); 

if (!user || !(await user[0].checkPassword(password))) {  
  console.log("user not exist") 
  return res.render('login',{errors:[{msg:"Credenital Error"},],data:{username,password}});
}      
  
return res.redirect('/'); 
*/