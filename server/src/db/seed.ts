import bcrypt from 'bcrypt';
import pool from './pool';

async function seed() {
    console.log('🌱 Seeding database...');

    // Create departments
    const deptResult = await pool.query(`
    INSERT INTO departments (name, description) VALUES
      ('Roads & Infrastructure', 'Handles roads, bridges, footpaths, and drainage'),
      ('Water Supply', 'Handles water supply, pipelines, and water quality'),
      ('Electricity', 'Handles streetlights, power outages, and electrical infrastructure'),
      ('Sanitation', 'Handles garbage collection, sewage, and waste management'),
      ('Parks & Gardens', 'Handles public parks, gardens, and green spaces'),
      ('General Administration', 'Handles general civic issues and escalations')
    ON CONFLICT (name) DO NOTHING
    RETURNING id, name;
  `);
    console.log(`  ✅ Seeded ${deptResult.rowCount} departments`);

    // Create categories
    await pool.query(`
    INSERT INTO categories (name, description, default_department_id) VALUES
      ('Pothole', 'Road potholes and surface damage', (SELECT id FROM departments WHERE name = 'Roads & Infrastructure')),
      ('Streetlight', 'Broken or non-functional streetlights', (SELECT id FROM departments WHERE name = 'Electricity')),
      ('Garbage Dump', 'Illegal garbage dumping or uncollected waste', (SELECT id FROM departments WHERE name = 'Sanitation')),
      ('Water Leak', 'Water pipeline leaks or supply issues', (SELECT id FROM departments WHERE name = 'Water Supply')),
      ('Broken Footpath', 'Damaged or broken footpaths', (SELECT id FROM departments WHERE name = 'Roads & Infrastructure')),
      ('Drainage', 'Blocked or overflowing drains', (SELECT id FROM departments WHERE name = 'Roads & Infrastructure')),
      ('Park Maintenance', 'Issues in public parks or gardens', (SELECT id FROM departments WHERE name = 'Parks & Gardens')),
      ('Other', 'General or uncategorized issues', (SELECT id FROM departments WHERE name = 'General Administration'))
    ON CONFLICT (name) DO NOTHING;
  `);
    console.log('  ✅ Seeded categories');

    // Create an admin user (password: admin123)
    const passwordHash = await bcrypt.hash('admin123', 10);
    await pool.query(`
    INSERT INTO users (email, password_hash, name, phone, role) VALUES
      ('admin@lokapp.in', $1, 'Admin User', '9999999999', 'ADMIN')
    ON CONFLICT (email) DO NOTHING;
  `, [passwordHash]);
    console.log('  ✅ Seeded admin user (admin@lokapp.in / admin123)');

    console.log('✅ Seeding complete.');
    await pool.end();
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
