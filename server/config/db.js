const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store_management',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Create Users Table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('manager', 'staff') DEFAULT 'staff'
  )
`;

// Create Inventory Table
const createInventoryTable = `
  CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    pieces INT NOT NULL,
    isAccepted BOOLEAN DEFAULT 0,
    submitted_by INT,
    FOREIGN KEY (submitted_by) REFERENCES users(id)
  )
`;

db.query(createUsersTable, (err) => {
  if (err) throw err;
  console.log('Users table ensured.');
});

db.query(createInventoryTable, (err) => {
  if (err) throw err;
  console.log('Inventory table ensured.');
});

module.exports = db;
