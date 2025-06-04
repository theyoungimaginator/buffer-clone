const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ success: false, error: `A user with this ${field} already exists.` });
        }
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages.join(', ') });
        }
        console.error('Registration error:', err);
        res.status(500).json({ success: false, error: 'Server Error during registration' });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, error: 'Server Error during login' });
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'There is no user with that email' });
        }
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // IMPORTANT: Replace with your actual frontend reset password URL
        const resetUrl = `${req.protocol}://${req.get('host').replace(':5000', ':3000')}/reset-password/${resetToken}`; // Adjust for frontend port
        // For production, this should be your deployed frontend URL.

        const message = `
            You are receiving this email because you (or someone else) has requested the reset of a password.
            Please click on this link to reset your your password: \n\n ${resetUrl} \n\n
            This link will expire in 15 minutes.
            If you did not request this, please ignore this email.
        `;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Token',
                message,
            });
            res.status(200).json({ success: true, data: 'Email Sent' });
        } catch (err) {
            console.error('Email send error:', err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, error: 'Email could not be sent' });
        }
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ success: false, error: 'Server Error during forgot password' });
    }
};

exports.resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired reset token' });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ success: false, error: 'Server Error during password reset' });
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.error('Get me error:', err);
        res.status(500).json({ success: false, error: 'Server Error fetching user data' });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_LIFETIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });
};