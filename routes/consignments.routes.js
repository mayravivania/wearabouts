const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/consignments.controller');

router.post('/', verifyToken, requireRole('buyer'), upload.array('photos', 5), ctrl.create);
router.get('/mine', verifyToken, requireRole('buyer'), ctrl.mine);
router.get('/', verifyToken, requireRole('admin'), ctrl.listAll);
router.patch('/:id', verifyToken, requireRole('admin'), ctrl.review);

module.exports = router;
