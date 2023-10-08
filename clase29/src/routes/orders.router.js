import { Router } from "express";
import { getOrders, getOrderById, createOrders, resolveOrder } from "../controllers/orders.controller.js";

const router = Router();

router.get('/', getOrders);
router.get('/:oid', getOrderById);
router.post('/', createOrders);
router.put('/:oid', resolveOrder);

export default router;