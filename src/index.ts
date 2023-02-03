import dotenv from 'dotenv';
dotenv.config();
import app from './app';

import connectDB from './config/connectDB';
if (process.argv.at(-1) === '--NODE_ENV=development') {
  console.clear();
  process.env.NODE_ENV = 'development';
} else process.env.NODE_ENV ||= 'production';
 
 
 
// import server from './server.js';  
 
// console.log(server)
 
 

let PORT:number = Number(process.env.PORT) || 8000;


const AppCallback = ():void =>{
  console.log(`App running on port "${PORT}"`);
  //  * MONGODB Connection 
  connectDB();
}


app.listen(PORT,AppCallback)