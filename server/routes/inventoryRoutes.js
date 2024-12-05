const express = require('express');
const { addPackage, getInventory, updatePackageStatus } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/add', addPackage);
router.get('/', getInventory);
router.put('/update', updatePackageStatus);

module.exports = router;
