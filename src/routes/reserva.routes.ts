import { Router } from "express";
import { createReserva, deleteReserva, getReserva, getReservas, updateReserva } from "../controllers/reserva.controllers";

const router = Router();

router.post('/reservasadd', createReserva)

router.get('/reservas', getReservas)

router.put('/reservas/:id', updateReserva)

router.delete('/reservas/:id', deleteReserva)

router.get('/reservas/:id', getReserva)

export default router;