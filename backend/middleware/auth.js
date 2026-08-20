const jwt = require('jsonwebtoken');
const user = require('../models/user');

const protect = async (req, res, next) => {
    let tokens;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        tokens = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(tokens, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({message: 'User not found'});
        }
        return next();
    } catch (err) {
        return res.status(401).json({message: 'Not authorized, token failed'});
    }
}

return res.status(401).json({message: 'Not authorized, not token'});

module.exports = {protect}; 