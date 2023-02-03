import {Request,Response} from "express"

const ShopPage = (req:Request, res:Response) => {
  res.render('shop');
};

export { ShopPage };
