const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Item = require("../../models/Item");

// @route   GET api/item
// @desc    Return list of items
// @access  Public
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// @route   POST api/item
// @desc    Add an item
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("price", "Price is Required").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price } = req.body;

    try {
      const item = new Item({
        name,
        price,
      });

      await item.save();
      console.log(req.body);
      res.send(item);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/cart/:id
// @desc    Delete a cart item
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await item.remove();

    res.json({ msg: "Item removed" });
  } catch (error) {
    if (error.kind === "objectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
