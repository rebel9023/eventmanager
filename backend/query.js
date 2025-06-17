const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./events.db', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the events database.');
});

// Insert sample data and query
db.serialize(() => {
    // Insert sample events
    db.run(`INSERT OR REPLACE INTO events (id, title, description, date, location, organizer) VALUES 
        ('1', 'Summer Party', 'Annual summer celebration', '2025-07-01', 'Central Park', 'John'),
        ('2', 'Tech Conference', 'Latest tech trends', '2025-08-15', 'Convention Center', 'Sarah'),
        ('3', 'Wedding Expo', 'Wedding planning event', '2025-09-01', 'Grand Hotel', 'Michael')`);

    // Insert sample RSVPs
    db.run(`INSERT OR REPLACE INTO rsvps (eventId, userId, status) VALUES 
        ('1', 'user1', 'going'),
        ('2', 'user1', 'maybe'),
        ('3', 'user2', 'going')`);

    // Query and display all tables and their contents
    console.log('\nDatabase contents after insertion:');
    
    // List all tables
    db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, tables) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('\nTables in the database:');
        tables.forEach(table => {
            console.log(table.name);
            // For each table, show its contents
            db.all(`SELECT * FROM ${table.name}`, [], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`\nContents of ${table.name}:`);
                console.log(JSON.stringify(rows, null, 2));
            });
        });
    });
});
});

// Close the database connection after queries complete
setTimeout(() => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}, 2000);
