// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('./models/item');

// Create an item
router.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send();
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an item
router.patch('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).send();
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an item
router.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send();
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
