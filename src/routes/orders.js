const { Router } = require('express');
const router = Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/:id', authMiddleware, orderController.getOrderDetails);

module.exports = router;