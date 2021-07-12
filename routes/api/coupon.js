const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Coupon = require("../../models/Coupon");
const Cart = require("../../models/Cart");

// @route   GET api/coupon
// @desc    Return list of coupons
// @access  Public
router.get("/", async (req, res) => {
  const coupons = await Coupon.find();
  res.json(items);
});

// @route   POST api/coupon
// @desc    Add a coupon
// @access  Public
router.post(
  "/",
  [
    check("code", "Code is Required").not().isEmpty(),
    check("type", "Type is Required").not().isEmpty(),
    check("value", "Value is Required").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, type, value } = req.body;

    try {
      const coupon = new Coupon({
        code,
        type,
        value,
      });

      await coupon.save();

      res.send(coupon);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/coupon/check
// @desc    Check coupon and checkout
// @access  Public
router.post(
  "/check",
  [check("code", "Code is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const code = req.body.code;
    let discounted;
    try {
      const coupon = await Coupon.findOne({ code });
      if (!coupon) res.status(404).send("Coupon not found");
      else {
        const cart = await Cart.find().populate("item");
        let total = cart.reduce((prev, cur) => {
          return prev + cur.count * cur.item.price;
        }, 0);
        switch (coupon.type) {
          case "fixed":
            total -= coupon.value;
            break;
          case "percent":
            total = total - total * (coupon.value / 100);
            break;
        }
        res.send({ total });
      }
      // res.send(coupon);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
