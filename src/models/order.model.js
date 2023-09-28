import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    
    user: {
        type: String,
        required: true,
        trim: true,
    },
  
    product: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: String,
        required: true,
        trim: true,
    },
    adress: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Boolean,
        required: true,
        
    }


})

export default mongoose.model("Order", orderSchema);