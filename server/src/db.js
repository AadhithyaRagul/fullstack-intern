const knex = require('knex');

const db = knex({
  client: 'better-sqlite3',
  connection: { filename: process.env.DB_FILE || './data.sqlite3' },
  useNullAsDefault: true,
});

const templates = [
  ['Modern Portfolio', 'Clean one-page portfolio for designers and developers.', 'Portfolio'],
  ['SaaS Landing Page', 'High-converting landing page with pricing and testimonials.', 'Landing Page'],
  ['Admin Dashboard', 'Responsive dashboard with charts, tables and dark mode.', 'Dashboard'],
  ['E-commerce Store', 'Product grid, cart and checkout UI for online shops.', 'E-commerce'],
  ['Personal Blog', 'Minimal blog layout with markdown-friendly typography.', 'Blog'],
  ['Startup Pitch Deck', 'Slide-style web template to present your startup idea.', 'Landing Page'],
];

async function init() {
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (t) => {
      t.increments('id');
      t.string('name').notNullable();
      t.string('email').notNullable().unique();
      t.string('password').notNullable();
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
  }
  if (!(await db.schema.hasTable('templates'))) {
    await db.schema.createTable('templates', (t) => {
      t.increments('id');
      t.string('name').notNullable();
      t.text('description');
      t.string('thumbnail_url');
      t.string('category');
    });
  }
  if (!(await db.schema.hasTable('favorites'))) {
    await db.schema.createTable('favorites', (t) => {
      t.increments('id');
      t.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
      t.integer('template_id').notNullable().references('templates.id').onDelete('CASCADE');
      t.unique(['user_id', 'template_id']);
    });
  }
  const [{ count }] = await db('templates').count({ count: '*' });
  if (Number(count) === 0) {
    await db('templates').insert(
      templates.map(([name, description, category], i) => ({
        name,
        description,
        category,
        thumbnail_url: `https://picsum.photos/seed/template${i + 1}/400/250`,
      }))
    );
    console.log('Seeded templates');
  }
}

module.exports = { db, init };
