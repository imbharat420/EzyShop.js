import passportLocal from "passport-local"
import { getFindUserQuery } from "../controllers/user/utils";
import User from "../models/userModel"

function passportConfig(passport: any) {
    passport.use(
        new passportLocal.Strategy(async (username: string, password: string, done: any) => {
            try{
                let user = await User.findOne(getFindUserQuery(username)); 
                if(!user) return done(null, false, {errors:[{msg:'User not found'}]})
                if (!user || !(await user.checkPassword(password))) return done(null, false, {message: 'Password is incorrect'})
                return done(null, user)                
            }catch(err){
                return done(err, false)
            }
        })
    )


    passport.serializeUser((user: any, done: any) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id: string, done: any) => {
        try{
            const user = await User.findById(id)
            done(null,user)
        }catch(err){
            return done(err, false)
        }
    })
}
export default passportConfig