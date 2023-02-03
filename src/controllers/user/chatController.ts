import {Request,Response} from "express"

const ChatPage = (req:Request, res:Response) => {
  res.render('chat');
};

export { ChatPage };
