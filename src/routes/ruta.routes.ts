import { Router } from "express";
import { createRuta, deleteRuta, getRuta, getRutas, updateRuta } from "../controllers/ruta.controllers";

const router = Router();


router.post('/rutas', createRuta)

router.get('/rutas', getRutas)

router.put('/rutas/:id', updateRuta)

router.delete('/rutas/:id',deleteRuta)

router.get('/rutas/:id', getRuta)

export default router