"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHorario = exports.deleteHorario = exports.updateHorario = exports.getHorarios = exports.createHorario = void 0;
const Horarios_1 = require("../entities/Horarios");
const createHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RutaID, BusID, FechaSalida, HoraSalida, FechaLlegada, Precio } = req.body;
        const horario = new Horarios_1.Horarios();
        horario.RutaID = RutaID;
        horario.BusID = BusID;
        horario.FechaSalida = FechaSalida;
        horario.HoraSalida = HoraSalida;
        horario.FechaLlegada = FechaLlegada;
        horario.Precio = Precio;
        yield horario.save();
        return res.json(horario);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createHorario = createHorario;
const getHorarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const horarios = yield Horarios_1.Horarios.find();
        return res.json(horarios);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getHorarios = getHorarios;
const updateHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RutaID, BusID, FechaSalida, HoraSalida, FechaLlegada, Precio } = req.body;
        const horario = yield Horarios_1.Horarios.findOneBy({ HorarioID: parseInt(req.params.id) });
        if (!horario)
            return res.status(404).json({ message: 'Horario does not exists' });
        horario.RutaID = RutaID;
        horario.BusID = BusID;
        horario.FechaSalida = FechaSalida;
        horario.HoraSalida = HoraSalida;
        horario.FechaLlegada = FechaLlegada;
        horario.Precio = Precio;
        horario.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateHorario = updateHorario;
const deleteHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Horarios_1.Horarios.delete({ HorarioID: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Horario not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteHorario = deleteHorario;
const getHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const horario = yield Horarios_1.Horarios.findOneBy({ HorarioID: parseInt(id) });
        if (horario === null) {
            return res.status(404).json('Horario not found');
        }
        return res.json(horario);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getHorario = getHorario;
