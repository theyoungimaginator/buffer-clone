const express = require('express');
const { register, login, forgotPassword, resetPassword, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;