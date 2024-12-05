const db = require('../config/db');

exports.addPackage = (req, res) => {
  const { product_name, category, price, pieces, submitted_by } = req.body;

  db.query(
    'INSERT INTO inventory (product_name, category, price, pieces, submitted_by) VALUES (?, ?, ?, ?, ?)',
    [product_name, category, price, pieces, submitted_by],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Package submitted for approval' });
    }
  );
};

exports.getInventory = (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.updatePackageStatus = (req, res) => {
  const { id, isAccepted } = req.body;

  db.query(
    'UPDATE inventory SET isAccepted = ? WHERE id = ?',
    [isAccepted, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Package status updated' });
    }
  );
};
