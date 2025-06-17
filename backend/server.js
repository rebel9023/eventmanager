const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database('./events.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  // Create tables
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

  // Add some initial data
  db.run(`INSERT OR IGNORE INTO events (id, title, description, date, location, organizer) 
    VALUES 
    ('1', 'Summer Party', 'Annual summer celebration', '2025-07-01', 'Central Park', 'John'),
    ('2', 'Tech Conference', 'Latest tech trends', '2025-08-15', 'Convention Center', 'Sarah'),
    ('3', 'Wedding Expo', 'Wedding planning event', '2025-09-01', 'Grand Hotel', 'Michael')`);
});

// Events endpoints
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY date', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  db.get('SELECT * FROM events WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Event not found' });
    res.json(row);
  });
});

app.post('/api/events', (req, res) => {
  const { id, title, description, date, location, organizer } = req.body;
  db.run('INSERT INTO events (id, title, description, date, location, organizer) VALUES (?, ?, ?, ?, ?, ?)',
    [id, title, description, date, location, organizer],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id });
    });
});

app.put('/api/events/:id', (req, res) => {
  const { title, description, date, location, organizer } = req.body;
  db.run('UPDATE events SET title=?, description=?, date=?, location=?, organizer=? WHERE id=?',
    [title, description, date, location, organizer, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

// RSVP endpoints
app.get('/api/rsvps', (req, res) => {
  const { userId, eventId } = req.query;
  let query = 'SELECT * FROM rsvps';
  let params = [];

  if (userId && eventId) {
    query += ' WHERE userId = ? AND eventId = ?';
    params = [userId, eventId];
  } else if (userId) {
    query += ' WHERE userId = ?';
    params = [userId];
  } else if (eventId) {
    query += ' WHERE eventId = ?';
    params = [eventId];
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/rsvps', (req, res) => {
  const { eventId, userId, status } = req.body;
  db.run('INSERT OR REPLACE INTO rsvps (eventId, userId, status) VALUES (?, ?, ?)',
    [eventId, userId, status],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ eventId, userId, status });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
