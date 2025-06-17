const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./events.db');

console.log('Connected to database.');

// Query events table
db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) {
        console.error('Error querying events:', err);
        return;
    }
    console.log('\nEvents table contents:');
    console.log(JSON.stringify(rows, null, 2));
    
    // Query RSVPs table
    db.all('SELECT * FROM rsvps', [], (err, rows) => {
        if (err) {
            console.error('Error querying rsvps:', err);
            return;
        }
        console.log('\nRSVPs table contents:');
        console.log(JSON.stringify(rows, null, 2));
        
        // Close the database
        db.close();
    });
});
