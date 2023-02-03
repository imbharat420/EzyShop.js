import {Request,Response} from "express"
const NotificationPage = (req:Request, res:Response) => {
  res.render('notification');
};

export { NotificationPage };
