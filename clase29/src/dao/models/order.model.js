import mongoose from "mongoose";

const colletion = "Orders";
const schema = new mongoose.Schema({
  numbre: Number,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business"
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  products: [],
  totalPrice: Number

});

const orderModel = mongoose.model(colletion, schema);
export default orderModel;