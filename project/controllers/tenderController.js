const Tender = require('../models/tenderModel.js');

const createTender = async (req, res) => {
    const {
        title,
        description,
        endDate,
        budget,
    } = req.body;
    
    try {
        const tender = await Tender.create({
            title: title,
            description: description,
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

const getActiveTenders = async (req, res) => {
    try {
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
        const tenders = await Tender.findAll();
        res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch all tenders' });
    }
};

const getTenderById = async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.tenderId);
        if (!tender) {
            return res.status(404).send({ error: 'Tender not found' });
        }
        res.render('active-tender-details', { tender: tender });
        // res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tender' });
    }
};

const getUserTenderByTitle = async (req, res) => {
    try {
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
    getTenderById,
    getUserTenderByTitle,
    getAllUserTenders,
    deleteUserTenderById
};
