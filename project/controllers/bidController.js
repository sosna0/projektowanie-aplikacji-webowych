const Bid = require('../models/bidModel.js');
const Tender = require('../models/tenderModel.js');

const createBid = async (req, res) => {
    const { userId, tenderId, amount } = req.body;
    
    try {
        const tender = await Tender.findByPk(tenderId);
        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }

        if (tender.status !== 'active') {
            return res.status(400).send({ error: 'Tender is not active' });
        }

        const bid = await Bid.create({
            userId: userId,
            tenderId: tenderId,
            amount: amount
        });

        res.status(201).send(bid);
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
            }
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
