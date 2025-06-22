const User = require('../models/User');

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...otherUserData } = user._doc;
        res.json(otherUserData);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        if (err.name === 'CastError' && err.path === '_id') {
            return res.status(400).json({ error: 'Invalid User ID format' });
        }
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const allowedUpdates = ['name', 'bio', 'profilePicture', 'email'];
        const actualUpdates = {};
        for (const key in updates) {
            if (allowedUpdates.includes(key)) {
                actualUpdates[key] = updates[key];
            }
        }

        const user = await User.findByIdAndUpdate(
            userId,
            actualUpdates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...userDataWithoutPassword } = user._doc;
        res.json(userDataWithoutPassword);

    } catch (err) {
        console.error('Error updating user profile:', err);
        if (err.name === 'CastError' && err.path === '_id') {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message || 'Validation failed' });
        }
        res.status(500).json({ error: 'Failed to update profile' });
    }
};