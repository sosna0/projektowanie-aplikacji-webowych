const Bid = require('../models/bidModel.js');
const Tender = require('../models/tenderModel.js');

const createBid = async (req, res) => {
    const { amount, bidderName } = req.body;
    const tenderId = req.params.tenderId;
    
    try {
        const tender = await Tender.findByPk(Number(tenderId));
        if (!tender) {
            return res.status(404).send({ error: 'Tender not found HEREEE' });
        }

        if (tender.status !== 'active') {
            return res.status(400).send({ error: 'Tender is not active' });
        }

        const bid = await Bid.create({
            userId: req.session.userId,
            tenderId: tenderId,
            amount: amount,
            bidderName: bidderName
        });

        res.redirect('/active-tenders/' + tenderId);

        // res.status(201).send(bid);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create bid' });
    }
};

const getBids = async (req, res) => {
    try {
        const bids = await Bid.findAll({
            where: {
                tenderId: req.params.tenderId
            },
            order:[
                ['amount', 'ASC']
            ]
        });
        res.status(200).send(bids);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch bids' });
    }
}

const getBid = async (req, res) => {
    try {
        const bids = await Bid.findAll({
            where: {
                tenderId: req.params.tenderId,
                userId: req.params.userId
            }
        });
        res.status(200).send(bids);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch bids' });
    }
}

module.exports = {
    createBid,
    getBids,
    getBid
};
