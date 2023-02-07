import mongoose,{Schema,Document} from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types';


let avatar = {
  female:'https://res.cloudinary.com/ds113ssay/image/upload/v1675455024/c218a5a84bcf9c75f5f6925d76c1762b_pkf519.jpg',
  male:"https://res.cloudinary.com/ds113ssay/image/upload/v1675455065/68b2dc8dc37e02aad6a03b550347f2c0_nhai8j.jpg"
}




const userSchema:Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
        type: String,
        required: true,
        default: function(this: { gender: "male" | "female" }){
            return avatar[this.gender];
        }
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male","Female"],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)


userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      // Hash Password
      const salt = await bcrypt.genSaltSync(10);
      this.password = await bcrypt.hashSync(this.password, salt);
      next();
    } catch (err: any) {
      next(err);
    }
  }

   next();
})


userSchema.methods.checkPassword = async function (password: string) {
  if (!password) {
    return false;
  }
  return bcrypt.compare(password, this.password);
};


// set TTL
// https://stackoverflow.com/a/35179159/10629172
userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * parseInt(process.env.EXPIRATION_TIME as string),
    partialFilterExpression: {
      isVerified: false,
    },
  }
);


const User = mongoose.model<IUser>('User', userSchema)

export default User
