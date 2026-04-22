import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  productImage: { type: String }, // Store the file path or URL of the uploaded image
});

const Product = mongoose.model("Product", productSchema);

export default Product;
