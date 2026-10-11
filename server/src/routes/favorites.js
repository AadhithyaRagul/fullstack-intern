const router = require('express').Router();
const { db } = require('../db');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/favorites
router.get('/', async (req, res, next) => {
  try {
    const rows = await db('favorites')
      .join('templates', 'templates.id', 'favorites.template_id')
      .where('favorites.user_id', req.user.id)
      .select('templates.*');
    res.json(rows);
  } catch (e) { next(e); }
});

// POST /api/favorites/:templateId
router.post('/:templateId', async (req, res, next) => {
  try {
    const templateId = Number(req.params.templateId);
    if (!(await db('templates').where({ id: templateId }).first()))
      return res.status(404).json({ message: 'Template not found' });
    const exists = await db('favorites').where({ user_id: req.user.id, template_id: templateId }).first();
    if (exists) return res.status(409).json({ message: 'Already in favorites' });
    await db('favorites').insert({ user_id: req.user.id, template_id: templateId });
    res.status(201).json({ message: 'Added to favorites' });
  } catch (e) { next(e); }
});

// DELETE /api/favorites/:templateId  (bonus: un-favorite)
router.delete('/:templateId', async (req, res, next) => {
  try {
    await db('favorites').where({ user_id: req.user.id, template_id: Number(req.params.templateId) }).del();
    res.json({ message: 'Removed from favorites' });
  } catch (e) { next(e); }
});

module.exports = router;
