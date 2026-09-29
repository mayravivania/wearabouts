const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const ctrl = require('../controllers/orders.controller');

router.post('/', verifyToken, requireRole('buyer'), ctrl.checkout);
router.get('/me', verifyToken, requireRole('buyer'), ctrl.myOrders);
router.get('/', verifyToken, requireRole('admin'), ctrl.allOrders);
router.patch('/:id/status', verifyToken, requireRole('admin'), ctrl.updateStatus);

module.exports = router;