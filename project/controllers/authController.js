const bcrypt = require('bcrypt');
const User = require('../models/User');


const registerUser = async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
        where: {
            name: username,
        }
    });

    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ 
            name: username, 
            password: hashedPassword 
        });

        // automatic login after registration
        req.session.userId = user.id;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration error');
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by name
        const user = await User.findOne({
            where: {
                name: username
            }
        });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Check if the password is valid
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // login
        req.session.userId = user.id;
        res.redirect('/');
        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerUser,
    loginUser
}