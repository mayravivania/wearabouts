const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const ctrl = require('../controllers/wishlist.controller');

router.post('/', verifyToken, requireRole('buyer'), ctrl.add);
router.get('/', verifyToken, requireRole('buyer'), ctrl.list);
router.delete('/:itemId', verifyToken, requireRole('buyer'), ctrl.remove);

module.exports = router;