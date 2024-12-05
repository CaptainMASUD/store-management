const db = require('../config/db');

// Fetch all staff members
exports.getAllStaff = (req, res) => {
  console.log('Fetching staff members...');
  db.query('SELECT * FROM users WHERE role = "staff"', (err, results) => {
    if (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log('Results:', results);
    res.status(200).json(results);
  });
};

// Promote a staff member to manager
exports.promoteToManager = (req, res) => {
  const { userId } = req.body;

  db.query(
    'UPDATE users SET role = "manager" WHERE id = ? AND role = "staff"',
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found or not eligible for promotion' });
      }

      res.status(200).json({ message: 'User promoted to manager successfully' });
    }
  );
};

// Fetch all users (including staff and managers)
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};



exports.updateUserRole = (req, res) => {
  const { userId, role } = req.body;

  db.query(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User role updated successfully' });
    }
  );
};


// Delete a user from the system
exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
};
