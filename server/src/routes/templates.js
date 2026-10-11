const router = require('express').Router();
const { db } = require('../db');

// GET /api/templates?search=&category=
router.get('/', async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const q = db('templates').orderBy('id');
    if (category) q.where({ category });
    if (search) q.where((b) => b.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`));
    res.json(await q);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const t = await db('templates').where({ id: req.params.id }).first();
    if (!t) return res.status(404).json({ message: 'Template not found' });
    res.json(t);
  } catch (e) { next(e); }
});

module.exports = router;
