import Tender from '../models/tenderModel.js';


export const createTender = async (req, res) => {
    const {
        title,
        description,
        startDate,
        endDate,
        budget,
        status,
        userId
    } = req.body;
    
    try{
        const tender = await Tender.create({
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            budget: budget,
            status: status,
            userId: userId
        })
        res.status(201).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create tender' });
    }
};

export const getActiveTenders = async (req, res) => {
    try{
        const tenders = await Tender.findAll({
            where:{
                status: "active"
            }
        });
        res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch active tenders' });
    }
}

export const getClosedTenders = async (req, res) => {
    try{
        const tenders = await Tender.findAll({
            where:{
                status: "closed"
            }
        });
        res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch closed tenders' });
    }
}

export const getAllTenders = async (req, res) => {
    try{
        const tenders = await Tender.findAll();
        res.status(200).send(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch all tenders' });
    }
}


export const getTenderById = async (req, res) => {
    try{
        const tender = await Tender.findByPk(req.params.tenderId);
        res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tender' });
    }
}

export const getUserTenderByTitle = async (req, res) => {
    try{
        const tender = await Tender.findAll({
            where:{
                userId: req.params.userId,
                title: req.params.title
            }
        });
        res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: `Failed to fetch user tender with title: ${req.params.title}`});
    }
}

export const getAllUserTenders = async (req, res) => {
    try{
        const tender = await Tender.findAll({
            where:{
                userId: req.params.userId,
            }
        });
        res.status(200).send(tender);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user tenders' });
    }
}