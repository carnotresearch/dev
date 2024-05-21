const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// @route GET api/items
// @desc Get All Items
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/items
// @desc Create an Item
router.post("/", (req, res) => {
  const { name, time } = req.body;
  const newItem = new Item({
    name: name,
    time: parseInt(time), // Ensure time is stored as an integer
  });

  newItem
    .save()
    .then(() => res.json("Item added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE api/items/:id
// @desc Delete an Item
router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route PUT api/items/:id
// @desc Update an Item
router.put("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.name = req.body.name;
      item.time = parseInt(req.body.time); // Ensure time is stored as an integer

      item
        .save()
        .then(() => res.json("Item updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
