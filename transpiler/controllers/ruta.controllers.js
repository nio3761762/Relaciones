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
exports.getRuta = exports.deleteRuta = exports.updateRuta = exports.getRutas = exports.createRuta = void 0;
const Rutas_1 = require("../entities/Rutas");
const createRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Origen, Destino } = req.body;
        const ruta = new Rutas_1.Rutas();
        ruta.Origen = Origen;
        ruta.Destino = Destino;
        yield ruta.save();
        return res.json(ruta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createRuta = createRuta;
const getRutas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rutas = yield Rutas_1.Rutas.find();
        return res.json(rutas);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getRutas = getRutas;
const updateRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Origen, Destino } = req.body;
        const ruta = yield Rutas_1.Rutas.findOneBy({ RutaID: parseInt(req.params.id) });
        if (!ruta)
            return res.status(404).json({ message: 'Ruta does not exists' });
        ruta.Origen = Origen;
        ruta.Destino = Destino;
        ruta.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateRuta = updateRuta;
const deleteRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Rutas_1.Rutas.delete({ RutaID: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Ruta not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteRuta = deleteRuta;
const getRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ruta = yield Rutas_1.Rutas.findOneBy({ RutaID: parseFloat(id) });
        if (ruta === null) {
            return res.status(404).json('Ruta not found');
        }
        return res.json(ruta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getRuta = getRuta;
