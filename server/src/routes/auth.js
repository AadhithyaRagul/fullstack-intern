const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db');

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sign = (u) =>
  jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email || !emailRe.test(email)) errors.email = 'Valid email is required';
    if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Validation failed', errors });

    const normalized = email.toLowerCase().trim();
    if (await db('users').where({ email: normalized }).first())
      return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({ name: name.trim(), email: normalized, password: hash });
    const user = { id, name: name.trim(), email: normalized };
    res.status(201).json({ token: sign(user), user });
  } catch (e) { next(e); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !emailRe.test(email) || !password)
      return res.status(400).json({ message: 'Valid email and password are required' });

    const row = await db('users').where({ email: email.toLowerCase().trim() }).first();
    if (!row || !(await bcrypt.compare(password, row.password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const user = { id: row.id, name: row.name, email: row.email };
    res.json({ token: sign(user), user });
  } catch (e) { next(e); }
});

module.exports = router;
