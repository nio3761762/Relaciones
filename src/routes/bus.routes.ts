import { Router } from "express";
import { createBus, deleteBus, getBus, getBuses, updateBus } from "../controllers/bus.controllers";


const router = Router();

router.post('/buses', createBus)

router.get('/buses', getBuses)

router.put('/buses/:id', updateBus)

router.delete('/buses/:id',deleteBus)

router.get('/buses/:id', getBus)

export default router