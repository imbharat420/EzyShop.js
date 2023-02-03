import {Request,Response} from "express"

const ShopCategoryPage = (req:Request, res:Response)=> {
  res.render('shop-category');
};

export { ShopCategoryPage };
