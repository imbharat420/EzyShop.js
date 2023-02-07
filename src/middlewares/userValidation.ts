import { NextFunction, Request,Response } from "express";
import { check,body, validationResult } from 'express-validator/check'


const registerPostValidtor = [
   check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(), 
  check('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({min: 8})
    .withMessage('Password must be 8 length')
    .bail(),
  body('con-password')
        .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
        .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
  check('file')
    .custom((value, {req}) => {
        console.log("image",req.file.mimetype.includes('image'));
        if(req.file.mimetype.includes('image')){
            return true; // return "non-falsy" value to indicate valid data"
        }else{
            return false; // return "falsy" value to indicate invalid data
        }
    }).withMessage('Please only submit Images.'),
  (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req); // this is returning Result object, not array

    if (!errors.isEmpty()) {
       console.log("Calling register",errors.array())
        res.render('register', {
            errors: errors.array(),
            data:{
             name:req.body.name,
             email:req.body.email,
             password:req.body.password,
             "con-password":req.body["con-password"],
             file:req.file
            }
        });
        return;
    }

    console.log("Calling Next")
    next()

    // try{
    //   validationResult(req).throw();
    //   res.locals.user = true
    //   next();
    // }catch(err:any){
    //   console.log("NO ERROR BY VALIDATOR",err.mapped());
    //   res.locals.user = false
    //   res.render("register",{errors: err.array()})
    //   return;
    // }

  },
];


export  {registerPostValidtor};



    // console.log(errors,errors.isEmpty())
    // if (!errors.isEmpty()){
       
    //     return ;
    // }else{
    //    console.log("NO ERROR BY VALIDATOR");
    //   next();  
    // }