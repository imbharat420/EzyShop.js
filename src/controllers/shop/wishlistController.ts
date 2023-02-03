import {Request,Response} from "express"

const WishlistPage = (req:Request, res:Response) => {
  res.render('wishlist');
};

export { WishlistPage };
