import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    src: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Boolean,
      required: true,
    
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
