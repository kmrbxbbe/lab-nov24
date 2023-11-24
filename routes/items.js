const express = require('express');
const mongoose = require('mongoose');
const Item = require('../models/Item');
const router = express.Router();



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/shoppingList", { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/add', async (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item({ name, price });
  try {
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/list', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const items = await Item.find();
    const total = items.reduce((acc, item) => acc + item.price, 0); // Calculate the total
    res.json({ total: total.toFixed(2) }); // Send back a nicely formatted string
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;