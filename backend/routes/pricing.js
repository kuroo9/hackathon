const express = require('express');
const { calculateDynamicPrice } = require('../services/dynamicPricingService');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
    const { demand, supply, location } = req.body;
    const price = calculateDynamicPrice(demand, supply);

    if (!price) {
        return res.status(400).json({ message: 'No drivers available' });
    }

    const booking = new Booking({ demand, supply, location });
    await booking.save();

    res.json({ price });
});

module.exports = router;
