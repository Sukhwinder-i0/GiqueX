import mongoose, { Document } from 'mongoose';

export interface GigDocument extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  media: string[]; 
  category:string,
  tags: string[],
  createdAt: Date;
}

const GigSchema = new mongoose.Schema<GigDocument>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  media: [{ type: String }],
  category: {
    type: String,
    required: true
  }, 
  tags: [{type: String}]
  
}, { timestamps: true });

export const gigsModel = mongoose.model<GigDocument>('Gig', GigSchema);
