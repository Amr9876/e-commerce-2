import { Schema, models, model } from "mongoose";

const ProductScema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

const Product = models?.Product || model("Product", ProductScema);

export default Product;
