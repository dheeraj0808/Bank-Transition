const db = require('./src/config/db');

async function setupUsersTable() {
    try {
        console.log('Creating users table...');
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✓ Users table created!');
        
        await db.query(`
            INSERT IGNORE INTO users (name, email, password) VALUES 
            ('Admin User', 'admin@example.com', 'admin123'),
            ('Test User', 'test@example.com', 'test123')
        `);
        
        console.log('✓ Sample users inserted!');
        
        const [users] = await db.query('SELECT id, name, email, created_at FROM users');
        console.log('\n📊 Users in database:');
        console.table(users);
        
        process.exit(0);
    } catch (err) {
        console.error('✗ Error:', err.message);
        process.exit(1);
    }
}

setupUsersTable();
