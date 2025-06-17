const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./events.db');

console.log('Connected to database.');

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        date TEXT,
        location TEXT,
        organizer TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rsvps (
        eventId TEXT,
        userId TEXT,
        status TEXT,
        PRIMARY KEY (eventId, userId)
    )`);

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

    // Query and show the results
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) {
            console.error('Error querying events:', err);
            return;
        }
        console.log('\nEvents table contents:');
        console.log(JSON.stringify(rows, null, 2));
        
        db.all('SELECT * FROM rsvps', [], (err, rows) => {
            if (err) {
                console.error('Error querying rsvps:', err);
                return;
            }
            console.log('\nRSVPs table contents:');
            console.log(JSON.stringify(rows, null, 2));
            
            db.close();
        });
    });
});
