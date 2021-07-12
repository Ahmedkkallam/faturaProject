const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Cart = require("../../models/Cart");
const Item = require("../../models/Item");

// @route   GET api/cart
// @desc    Return list of cart items
// @access  Public
router.get("/", async (req, res) => {
  const cartItems = await Cart.find().populate("item");
  res.json(cartItems);
});

// @route   POST api/cart
// @desc    Add an item to the cart
// @access  Public
router.post(
  "/",
  [
    check("item", "Item is Required").not().isEmpty(),
    check("count", "Count is Required").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item, count } = req.body;
    const selectedItem = await Item.findById(item);

    if (!selectedItem) {
      return res.status(404).json({ msg: "item not found" });
    }

    try {
      const existingItem = await Cart.findOne({ item });
      //check if item already exists
      if (existingItem) {
        existingItem.count += count;
        await existingItem.save();
        res.send(existingItem);
      } else {
        //add a new cart item
        const cartItem = new Cart({
          item,
          count,
        });
        await cartItem.save();
        res.send(cartItem);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PATCH api/cart/:id
// @desc    Update a cart item
// @access  Public

router.patch("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found" });
    }
    const count = req.body.count;
    cartItem.count = count;
    await cartItem.save();
    const cart = await Cart.find().populate("item");
    res.json(cart);
  } catch (error) {
    if (error.kind === "objectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/cart/:id
// @desc    Delete a cart item
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await cartItem.remove();

    const cart = await Cart.find().populate("item");
    res.json(cart);
  } catch (error) {
    if (error.kind === "objectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
