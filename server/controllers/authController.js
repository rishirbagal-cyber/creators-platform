import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            const error = new Error('Please provide email and password');
            error.status = 400;
            return next(error);
        }

        // 2. Find user and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);
        }

        // 3. Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);
        }

        // 4. Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        // 5. Remove password from response
        user.password = undefined;

        // 6. Send response
        res.status(200).json({
            success: true,
            token,
            user
        });

    } catch (error) {
        next(error);
    }
};
