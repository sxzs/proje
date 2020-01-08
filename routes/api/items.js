const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route get api/items
///@desc Get All Items
///@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route get api/items
///@desc Get one Item
///@access Public
router.get('/:id', (req, res) => { //?<------------------- auth for authorizaton
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }))
});

// @route POST api/items
///@desc Creat a item
///@access Private
router.post('/', auth, (req, res) => { //?<------------------- auth for authorizaton
    const newItem = new Item({
        title: req.body.title,
        post: req.body.post,
        author: req.body.author       //?<------------------- add maker
    });

    newItem.save().then(item => res.json(item));
});

// @route Delete api/item/:id
///@desc Delete A item
///@access Private
router.delete('/:id', auth, (req, res) => { //?<------------------- auth for authorizaton
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;