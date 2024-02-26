router.get('/flights/:flightId/tickets/new', (req, res) => {
    res.render('tickets/new', { flightId: req.params.flightId });
});

router.post('/flights/:flightId/tickets', async (req, res) => {
    try {
        const { seat, price } = req.body;
        const ticket = new Ticket({
            seat,
            price,
            flight: req.params.flightId
        });
        await ticket.save();
        res.redirect(`/flights/${req.params.flightId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
