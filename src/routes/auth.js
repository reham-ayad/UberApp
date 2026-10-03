const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/authMiddleware');

// router.use(authMiddleware);

router.post('/register', async (req, res) => {

  try {
     const { name, email, password, role } = req.body;
if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ 
        message: 'Name is required and must be a non-empty string' }
    );
}
if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Email is required and must be a non-empty string' });
}
if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password is required and must be at least 6 characters long' });
}

const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
}


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name:name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role:role === 'driver' ? 'driver' : 'user', // Default to 'user' if role is not 'driver'
    });

    await user.save();
    
res.status(201).json({ success: true, message: 'User registered successfully', user });




    // Generate JWT token

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ success: true, message: 'Login successful', user, token });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



router.get('/profile', authMiddleware, async (req, res) => {
res.json({userId:req.userId})})

module.exports = router;