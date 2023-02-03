import {Request,Response} from "express"

const LoginPage = (req:Request, res:Response) => {
  res.render('login');
};

const RegisterPage = (req:Request, res:Response) => {
  res.render('register');
};

// const UserCreate = (req, res) => {
//   const {
//     file,
//     body: { name },
//   } = req;
//   console.log(file, name);
//   if (!file && !name) {
//     res.status(400).json({ message: 'bad request' });
//   }
//   res.json({ file, name });
// };

export { RegisterPage,LoginPage };
