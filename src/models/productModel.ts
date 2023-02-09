import mongoose,{Schema} from "mongoose"


interface IProduct extends mongoose.Document {
    user: string
    name: string
    image: string[]
    brand: string
    category: string
    description: string
    sizes: string[]
    colors: string[]
    rating: number
    numReviews: number
    price: number
    countInStock: number
}


const productSchema:Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: [String], 
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product
