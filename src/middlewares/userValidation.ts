import { NextFunction, Request,Response } from "express";
import { check,body,oneOf ,validationResult } from 'express-validator/check'


const registerPostValidtor = [
   check('username')
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
    .isLength({min: 3})
    .withMessage('Password must be 3 length')
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
             username:req.body.username,
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
  },
];


const LoginPostValidtor = [
  oneOf([
    check('username')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid Username!')
      .bail(), 
    check('username')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Email is not proper!')
    .bail(), 
  ]),
  check('password')
    .trim() 
    .not()
    .isEmpty()
    .isLength({min: 3})
    .withMessage('Password must be 3 length')
    .bail(),
  (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req); // this is returning Result object, not array

    if (!errors.isEmpty()) {
       console.log("Calling login",errors.array())
        res.render('login', {
            errors: errors.array(),
            data:{
             username:req.body.username,
             password:req.body.password
            }
        });
        return;
    }

    console.log("Calling Next")
    next()
  },
];



export  {registerPostValidtor,LoginPostValidtor};



    // console.log(errors,errors.isEmpty())
    // if (!errors.isEmpty()){
       
    //     return ;
    // }else{
    //    console.log("NO ERROR BY VALIDATOR");
    //   next();  
    // }