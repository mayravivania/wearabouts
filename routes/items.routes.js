const router = require('express').Router();
const c = require('../controllers/items.controller');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const upload = require('../middleware/upload');

router.get('/', c.getItems);
router.get('/:id', c.getItemById);
router.post('/', verifyToken, requireRole('admin'), upload.array('photos', 5), c.createItem);
router.put('/:id', verifyToken, requireRole('admin'), upload.array('photos', 5), c.updateItem);
router.delete('/:id', verifyToken, requireRole('admin'), c.deleteItem);

module.exports = router;