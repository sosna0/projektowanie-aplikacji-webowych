import Bid from '../models/bidModel.js';

export const createBid = async (req, res) => {
    const { userId, tenderId, amount } = req.body;
    
    try{
        const bid = await Bid.create({
            userId: userId,
            tenderId: tenderId,
            amount: amount
        })
        res.status(201).send(bid);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create bid' });
    }
};

export const getBids = async (req, res) => {
    try{
        const bids = await Bid.findAll({
            where:{
                tenderId: req.params.tenderId
            }
        });
        res.status(200).send(bids);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch bids' });
    }
}

export const getBid = async (req, res) => {
    try{
        const bids = await Bid.findAll({
            where:{
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
