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
exports.getReserva = exports.deleteReserva = exports.updateReserva = exports.getReservas = exports.createReserva = void 0;
const Reservas_1 = require("../entities/Reservas");
const createReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UsuarioID, HorarioID, FechaReserva, Asientos, Estado } = req.body;
        const reserva = new Reservas_1.Reservas();
        reserva.UsuarioID = UsuarioID;
        reserva.HorarioID = HorarioID;
        reserva.FechaReserva = FechaReserva;
        reserva.Asientos = Asientos;
        reserva.Estado = Estado;
        yield reserva.save();
        return res.json(reserva);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createReserva = createReserva;
const getReservas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reserva = yield Reservas_1.Reservas.find();
        return res.json(reserva);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getReservas = getReservas;
const updateReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UsuarioID, HorarioID, FechaReserva, Asientos, Estado } = req.body;
        const reserva = yield Reservas_1.Reservas.findOneBy({ ReservaID: parseInt(req.params.id) });
        if (!reserva)
            return res.status(404).json({ message: 'Reserva does not exists' });
        reserva.UsuarioID = UsuarioID;
        reserva.HorarioID = HorarioID;
        reserva.FechaReserva = FechaReserva;
        reserva.Asientos = Asientos;
        reserva.Estado = Estado;
        reserva.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateReserva = updateReserva;
const deleteReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Reservas_1.Reservas.delete({ ReservaID: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Reserva not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteReserva = deleteReserva;
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("UsuarioID:", id);
        const reserva = yield Reservas_1.Reservas.findOneBy({ ReservaID: parseFloat(id) });
        if (reserva === null) {
            return res.status(404).json('user not found');
        }
        return res.json(reserva);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getReserva = getReserva;
