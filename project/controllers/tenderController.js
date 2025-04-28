const Tender = require('../models/tenderModel.js');
const Bid = require('../models/bidModel.js');
const { Op } = require('sequelize');

const createTender = async (req, res) => {
    const {
        title,
        description,
        institutionName,
        endDate,
        budget,
    } = req.body;
    
    try {
        updateTendersStatus();
        const tender = await Tender.create({
            title: title,
            description: description,
            institutionName: institutionName,
            endDate: endDate,
            budget: budget,
            userId: req.session.userId
        });
        res.redirect('/active-tenders');
        // res.status(201).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create tender' });
    }
};

async function updateTendersStatus() {
    await Tender.update(
        { status: 'closed' },
        {
            where: {
                status: 'active',
                endDate: {
                    [Op.lt]: new Date()
                }
            }
        }
    );
}

const getActiveTenders = async (req, res) => {
    try {
        updateTendersStatus();
        const tenders = await Tender.findAll({
            where: {
                status: "active"
            }
        });
        res.render('active-tenders', { tenders: tenders });
        // res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch active tenders' });
    }
};

const getClosedTenders = async (req, res) => {
    try {
        updateTendersStatus();
        const tenders = await Tender.findAll({
            where: {
                status: "closed"
            }
        });
        res.render('closed-tenders', { tenders: tenders });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch closed tenders' });
    }
};

const getAllTenders = async (req, res) => {
    try {
        updateTendersStatus();
        const tenders = await Tender.findAll();
        res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch all tenders' });
    }
};

const getActiveTenderById = async (req, res) => {
    try {
        updateTendersStatus();
        const tender = await Tender.findOne({
            where: {
                id: req.params.tenderId,
                status: 'active'
            }
        });

        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }
        res.render('active-tender-details', {
            tender: tender,
            userId: req.session.userId
        });
        // res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tender' });
    }
};


const getClosedTenderWithBidsById = async (req, res) => {
    try {
        updateTendersStatus();
        const tender = await Tender.findOne({
            where: {
                id: req.params.tenderId,
                status: 'closed'
            }
        });

        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }

        const bids = await Bid.findAll({
            where: {
                tenderId: req.params.tenderId,
                amount: {
                    [Op.lte]: tender.budget
                }
            },
            order:[
                ['amount', 'ASC']
            ]
        });        

        res.render('closed-tender-details', {
            tender: tender,
            bids: bids,
            userId: req.session.userId
        });
        // res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tender' });
    }
};


const getUserTenderByTitle = async (req, res) => {
    try {
        updateTendersStatus();
        const tender = await Tender.findOne({
            where: {
                userId: req.session.userId,
                title: req.params.title
            }
        });

        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }

        res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: `Failed to fetch user tender with title: ${req.params.title}` });
    }
};

const getAllUserTenders = async (req, res) => {
    try {
        updateTendersStatus();
        const tenders = await Tender.findAll({
            where: {
                userId: req.session.userId,
            }
        });
        res.render('active-tenders', { tenders: tenders });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tenders' });
    }
};

const deleteUserTenderById = async (req, res) => {
    try {
        const tender = await Tender.destroy({
            where: {
                id: req.params.tenderId,
                userId: req.session.userId
            }
        });
        
        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }
        
        res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete user tender' });
    }
};

module.exports = {
    createTender,
    getActiveTenders,
    getClosedTenders,
    getAllTenders,
    getActiveTenderById,
    getClosedTenderWithBidsById,
    getUserTenderByTitle,
    getAllUserTenders,
    deleteUserTenderById
};
