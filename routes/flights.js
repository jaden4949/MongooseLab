const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

router.get('/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        const tickets = await Ticket.find({ flight: flight._id });
        res.render('flights/show', { flight, tickets });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/:id/destinations', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        const newDestination = {
            airport: req.body.airport,
            arrival: req.body.arrival
        };
        flight.destinations.push(newDestination);
        await flight.save();
        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



module.exports = router;