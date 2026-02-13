const db = require('./src/config/db');

async function setupDatabase() {
    try {
        console.log('Creating accounts table...');

        // Create table
        await db.query(`
            CREATE TABLE IF NOT EXISTS accounts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                balance DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✓ Table created successfully!');

        // Insert sample data
        console.log('Inserting sample data...');

        await db.query(`
            INSERT IGNORE INTO accounts (name, email, balance) VALUES 
            ('Dheeraj Kumar', 'dheeraj@example.com', 10000.00),
            ('Ujjwal Pratap', 'ujjwal@example.com', 15000.00)
        `);

        console.log('✓ Sample data inserted!');

        // Show all accounts
        const [accounts] = await db.query('SELECT * FROM accounts');
        console.log('\n📊 Current accounts in database:');
        console.table(accounts);

        process.exit(0);
    } catch (err) {
        console.error('✗ Error:', err.message);
        process.exit(1);
    }
}

setupDatabase();
