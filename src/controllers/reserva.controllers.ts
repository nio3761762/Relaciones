import { Request, Response } from "express";
import { Reservas } from "../entities/Reservas";
import { Horarios } from "../entities/Horarios";
import { Users } from "../entities/Users";

export const createReserva = async (req: Request, res: Response) => {
    try {
        const { Usuario, HorarioID, FechaReserva, Asientos, Estado } = req.body;

        // Buscar el usuario y el horario por sus IDs
        const usuario = await Users.findOneBy({  Usuario });
        const horario = await Horarios.findOneBy({ HorarioID });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }

        if (!horario) {
            return res.status(404).json({ message: 'Horario not found' });
        }

        const reserva = new Reservas();
        reserva.Usuario = usuario;
        reserva.Horario = horario;
        reserva.FechaReserva = FechaReserva;
        reserva.Asientos = Asientos;
        reserva.Estado = Estado;

        await reserva.save();
        return res.json(reserva);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getReservas = async (_req: Request, res: Response) => {
    try {
        const reservas = await Reservas.find({ relations: ['Usuario', 'Horario'] });
        const result = reservas.map(reservas => ({
            ReservaID:reservas.ReservaID,
            UsuarioID : reservas.Usuario,
            HorarioID : reservas.Horario,
            FechaReserva : reservas.FechaReserva,
            Asientos : reservas.Asientos,
            Estado : reservas.Estado
        }));
        
        return res.json({ listarReservas: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const updateReserva = async (req: Request, res: Response) => {
    try {
        const { Usuario, HorarioID, FechaReserva, Asientos, Estado } = req.body;

        const reserva = await   Reservas.findOneBy({ ReservaID: parseInt(req.params.id) });
       
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva does not exist' });
        }
       
        // Buscar el usuario y el horario por sus IDs
        const usuario = await Users.findOneBy({ Usuario });
        const horario = await Horarios.findOneBy({ HorarioID });

      
        if (!usuario || !horario) {
            return res.status(404).json({ message: "Usuario or Horario not found" });
        }

        reserva.Usuario = usuario;
        reserva.Horario = horario;
        reserva.FechaReserva = FechaReserva;
        reserva.Asientos = Asientos;
        reserva.Estado = Estado;

        await reserva.save();

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteReserva = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await Reservas.delete({ ReservaID: parseInt(id) });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Reserva not found' });
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getReserva = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reserva = await Reservas.findOne({ where:{ ReservaID: parseInt(id)} ,  relations: ['Usuario', 'Horario'] });
        
      
       
        if (!reserva) {
            return res.status(404).json('Reserva not found');
        }
        const result = {
            ReservaID:reserva.ReservaID,
            UsuarioID : reserva.Usuario,
            HorarioID : reserva.Horario,
            FechaReserva : reserva.FechaReserva,
            Asientos : reserva.Asientos,
            Estado : reserva.Estado
        };

       
        return res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
