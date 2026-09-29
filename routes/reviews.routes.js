const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const ctrl = require('../controllers/reviews.controller');

router.post('/', verifyToken, requireRole('buyer'), ctrl.create);
router.get('/item/:id', ctrl.listByItem); // publik, tanpa token

module.exports = router;