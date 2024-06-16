import { Router } from "express";
import { createHorario, deleteHorario, getHorario, getHorarios, updateHorario } from "../controllers/horario.controllers";

const router = Router();

router.post('/horarios', createHorario)

router.get('/horarios', getHorarios)

router.put('/horarios/:id', updateHorario)

router.delete('/horarios/:id', deleteHorario)

router.get('/horarios/:id', getHorario)

export default router;