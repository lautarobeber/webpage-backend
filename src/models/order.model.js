import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    order_id: {
        type: String,
        required: true,
        trim: true,
    },
    user: {

    },
    amount: {
        type: String,
        required: true,
        trim: true,
    },
    province: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    adress: {
        type: String,
        required: true,
        trim: true,
    },
    shipping: {
        type: String,
        required: true,
        trim: true,
    }


})

export default mongoose.model("Order", orderSchema);