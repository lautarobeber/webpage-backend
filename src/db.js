import mongoose from "mongoose";

export const connectDB = async () =>{
try{
    await mongoose.connect('mongodb+srv://fullstack:fullstack@cluster0.w48h9l2.mongodb.net/shop?retryWrites=true&w=majority')
    console.log('db is connected')
} catch (error) {
    console.log(error);
}
    
}
