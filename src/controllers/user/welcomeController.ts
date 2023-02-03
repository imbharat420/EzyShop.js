import {Request,Response} from "express"
const WelcomePage = (req:Request, res:Response) => {
  res.render('welcome');
};

export { WelcomePage };
