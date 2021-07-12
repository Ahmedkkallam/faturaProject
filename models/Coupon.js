const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["fixed", "percent"],
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = Coupon = mongoose.model("coupon", CouponSchema);
