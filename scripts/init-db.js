const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(process.cwd(), 'hup-holland.db')
const db = new Database(dbPath)

console.log('Initializing database...')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    company_name TEXT NOT NULL,
    industry TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY,
    revenue TEXT,
    employees TEXT,
    market_share TEXT,
    valuation TEXT,
    funding_stage TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS funding_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    startup_name TEXT NOT NULL,
    fund_name TEXT,
    stage TEXT,
    sector TEXT,
    amount_eur REAL,
    year INTEGER
  );

  CREATE TABLE IF NOT EXISTS saved_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    funding_name TEXT NOT NULL,
    funding_type TEXT,
    match_score INTEGER,
    funding_amount TEXT,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    funding_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );
`)

console.log('✅ Database initialized successfully!')
console.log('Tables created: users, sessions, user_profiles, funding_opportunities, saved_opportunities, chat_messages, applications')

// Check funding opportunities count
const count = db.prepare('SELECT COUNT(*) as count FROM funding_opportunities').get()
console.log(`📊 Funding opportunities in database: ${count.count}`)

db.close()
