import mongoose, { Schema } from "mongoose";

export interface OrderDocument extends Document {
  gig: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'completed';
  price: number;
  createdAt: Date;
}

const orderSchema = new Schema (
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true
    }, 
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    price: {
      type:Number,
      required: true
    }
  }, { timestamps: true }
)

export default mongoose.model<OrderDocument>('Order', orderSchema);

