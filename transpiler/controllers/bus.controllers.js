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
exports.getBus = exports.deleteBus = exports.updateBus = exports.getBuses = exports.createBus = void 0;
const Buses_1 = require("../entities/Buses");
const createBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Placa, Modelo, Capacidad } = req.body;
        const Bus = new Buses_1.Buses();
        Bus.Placa = Placa;
        Bus.Modelo = Modelo;
        Bus.Capacidad = Capacidad;
        yield Bus.save();
        return res.json(Bus);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createBus = createBus;
const getBuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Bus = yield Buses_1.Buses.find();
        return res.json(Bus);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getBuses = getBuses;
const updateBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Placa, Modelo, Capacidad } = req.body;
        const Bus = yield Buses_1.Buses.findOneBy({ BusID: parseInt(req.params.id) });
        if (!Bus)
            return res.status(404).json({ message: 'bus doest not exists' });
        Bus.Placa = Placa;
        Bus.Modelo = Modelo;
        Bus.Capacidad = Capacidad;
        Bus.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateBus = updateBus;
const deleteBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Buses_1.Buses.delete({ BusID: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteBus = deleteBus;
const getBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const bus = yield Buses_1.Buses.findOneBy({ BusID: parseInt(id) });
        if (bus === null) {
            return res.status(404).json('Bus not found');
        }
        return res.json(bus);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getBus = getBus;
