import {Request,Response} from "express"

const OrderPage = (req:Request, res:Response) => {
  res.render('order');
};

export { OrderPage };
