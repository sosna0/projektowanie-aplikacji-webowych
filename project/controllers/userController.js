import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    const { name } = req.body;
    
    try{
        const user = await User.create({ name: name})
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create bid' });
    }
};

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
}

export const getUserById = async (req, res) => {
    try{
        const user = await User.findAll({
            where:{
                userId: req.params.userId
            }
        });
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user by id' });
    }
}

export const getUserByName = async (req, res) => {
    try{
        const user = await User.findAll({
            where:{
                userId: req.params.username
            }
        });
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user by name' });
    }
}
