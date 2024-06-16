import { Request, Response } from "express";
import { Horarios } from "../entities/Horarios";
import exp from "constants";
import { prependListener } from "process";
import { Rutas } from "../entities/Rutas";
import { Buses } from "../entities/Buses";


export const createHorario = async (req: Request, res: Response) => {
    try {
        const { RutaID, BusID, FechaSalida, HoraSalida, FechaLlegada, Precio } = req.body;

        const ruta = await Rutas.findOneBy({ RutaID });
        const bus = await Buses.findOneBy({ BusID });

        if (!ruta || !bus) {
            return res.status(404).json({ message: "Ruta or Bus not found" });
        }

        const horario = new Horarios();
        horario.Ruta = ruta;
        horario.Bus = bus;
        horario.FechaSalida = FechaSalida;
        horario.HoraSalida = HoraSalida;
        horario.FechaLlegada = FechaLlegada;
        horario.Precio = Precio;

        await horario.save();
        return res.json(horario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

// Función para obtener todos los horarios
export const getHorarios = async (req: Request, res: Response) => {
    try {
        const horarios = await Horarios.find({ relations: ["Ruta", "Bus"] });
        const result = horarios.map(horarios => ({
            HorarioID: horarios.HorarioID,
            RutaID: horarios.Ruta,
            BusID: horarios.Bus,
            FechaSalida: horarios.FechaSalida,
            HoraSalida: horarios.HoraSalida,
            FechaLlegada: horarios.FechaLlegada,
            Precio: horarios.Precio
        }));
        return res.json({ listarHorarios: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

// Función para actualizar un horario
export const updateHorario = async (req: Request, res: Response) => {
    try {
        const { RutaID, BusID, FechaSalida, HoraSalida, FechaLlegada, Precio } = req.body;

        const horario = await Horarios.findOneBy({ HorarioID: parseInt(req.params.id) });

        if (!horario) return res.status(404).json({ message: 'Horario does not exist' });

        const ruta = await Rutas.findOneBy({ RutaID });
        const bus = await Buses.findOneBy({ BusID });

        if (!ruta || !bus) {
            return res.status(404).json({ message: "Ruta or Bus not found" });
        }

        horario.Ruta = ruta;
        horario.Bus = bus;
        horario.FechaSalida = FechaSalida;
        horario.HoraSalida = HoraSalida;
        horario.FechaLlegada = FechaLlegada;
        horario.Precio = Precio;

        await horario.save();

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

// Función para eliminar un horario
export const deleteHorario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await Horarios.delete({ HorarioID: parseInt(id) });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Horario not found' });
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

// Función para obtener un horario por ID
export const getHorario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const horario = await Horarios.findOne({
            where: { HorarioID: parseInt(id) },
            relations: ["Ruta", "Bus"]
        });

        if (horario === null) {
            return res.status(404).json('Horario not found');
        }

        const result = {
            HorarioID: horario.HorarioID,
            RutaID: horario.Ruta,
            BusID: horario.Bus,
            FechaSalida: horario.FechaSalida,
            HoraSalida: horario.HoraSalida,
            FechaLlegada: horario.FechaLlegada,
            Precio: horario.Precio
        };

        return res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};