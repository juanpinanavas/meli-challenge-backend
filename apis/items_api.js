const express = require('express');
const router = express.Router();
const httpClient = require('../utils/http_client');
const ItemService = require('../services/item_service');
const itemServiceInstance = new ItemService(httpClient);

router.get('/', async (req, res) => {
    const { q : query } = req.query;
    if (!query) {
        res.status(400);
    }
    const data = await itemServiceInstance.searchItem(query);
    res.json(data);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400);
    }
    const data = await itemServiceInstance.getItem(id);
    res.json(data);
});

module.exports = router;