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

productSchema.methods.setImgUrl = function setImgUrl (filename) {
  this.src = `http://localhost:4000/public/${filename}`
}

export default mongoose.model("Product", productSchema);
