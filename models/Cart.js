const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
