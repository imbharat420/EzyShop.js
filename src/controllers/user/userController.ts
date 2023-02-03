import {Request,Response} from "express"

const UserPage = (req:Request, res:Response) => {
  res.render('index');
};

const UserCreate = (req:Request, res:Response) => {
  const {
    file,
    body: { name },
  } = req;
  console.log(file, name);
  if (!file && !name) {
    res.status(400).json({ message: 'bad request' });
  }
  res.json({ file, name });
};

export { UserCreate, UserPage };
