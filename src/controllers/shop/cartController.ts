import {Request,Response} from "express"


const CartPage = (req:Request, res:Response) => {
  res.render('cart');
};

export { CartPage };
