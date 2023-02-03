import {Request,Response} from "express"

const CheckoutPage = (req:Request, res:Response) => {
  res.render('checkout');
};

export { CheckoutPage };
