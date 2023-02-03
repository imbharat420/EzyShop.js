import {Request,Response} from "express"
export  const ProfileSettingsPage = (req:Request, res:Response) => {
  res.render('profile-settings');
};

