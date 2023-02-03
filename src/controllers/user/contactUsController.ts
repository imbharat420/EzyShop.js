import {Request,Response} from "express"

const ContactUsPage = (req:Request, res:Response) => {
  res.render('contact-us');
};

export { ContactUsPage };
