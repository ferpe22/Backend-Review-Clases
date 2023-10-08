import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders"
    }
  ]
});

const userModel = mongoose.model("Users", schema);
export default userModel;