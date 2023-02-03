import {Request,Response} from "express"

const SingleProductPage =(req:Request, res:Response) => {
  res.render('single-product');
};

export { SingleProductPage };
