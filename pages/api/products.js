import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
  return await Product.find().exec();
}

export default async function handler(req, res) {
  await initMongoose();

  const { ids } = req.query;

  if (ids) {
    const idsArray = ids.split(",");
    res.json(await Product.find({ _id: { $in: idsArray } }).exec());
  } else if (ids.length === 0) {
    res.status(404).json({ message: "ids not found" });
  } else {
    res.json(await findAllProducts());
  }
}
