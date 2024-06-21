import { Request, Response } from "express";
import { Reservas } from "../entities/Reservas";
import { Horarios } from "../entities/Horarios";
import { Users } from "../entities/Users";
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";
export const getReservaByFechaHorarioEstadoBus = async (req: Request, res: Response) => {
    try {
        const { fecha, horarioID, estado, busID } = req.params;

        // Convertir el ID del horario y del bus a números enteros
        const parsedHorarioID = parseInt(horarioID);
        const parsedBusID = parseInt(busID);

        // Realizar la consulta buscando la reserva activa
        const reserva = await Reservas.findOne({
            where: {
                FechaReserva: fecha,
                Estado: "A", // Cambiamos la condición para buscar solo las reservas activas
                Horario: { 
                    HorarioID: parsedHorarioID,
                    Bus: { BusID: parsedBusID }
                }
            },
            relations: ['Usuario', 'Horario', 'Horario.Bus', 'Horario.Ruta'] // Incluir las relaciones necesarias
        });

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva activa no encontrada' });
        }

        return res.json(reserva);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const createReserva = async (req: Request, res: Response) => {
    try {
        const { UsuarioID, HorarioID, FechaReserva, Asientos, Estado,RAsientos,PrecioTotal,Destino } = req.body;

        // Buscar el usuario y el horario por sus IDs
        const usuario = await Users.findOne({ where: { Usuario: UsuarioID } });
        const horario = await Horarios.findOne({ where: { HorarioID: HorarioID } });

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
        reserva.RAsientos=RAsientos
        reserva.PrecioTotal= PrecioTotal
        await reserva.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Puedes usar otros servicios de correo como Outlook, Yahoo, etc.
            auth: {
                user: 'expresoarequipa@gmail.com',
                pass: 'zphx vklc elqj ubgd'
            }
        });

        // Configurar los detalles del correo electrónico
        const mailOptions = {
            from: 'expresoarequipa@gmail.com',
            to: 'lopezg.ll37@gmail.com',  
            subject: 'Nueva Reserva Confirmada',
            text: `El usuario ${usuario.Email},\n\n Reserva confirmada.\n\nDetalles de la reserva:\nFecha de salida del Viaje: ${FechaReserva}\nHorario: ${horario.HoraSalida},\n Destino: ${Destino},\nAsientos: ${RAsientos}\nPrecio Total: ${PrecioTotal}\n\nGracias por la reserva.`
        };
     //destino: ${Horario.destino}
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo: ', error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });


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
            Estado : reservas.Estado,
            RAsientos:reservas.RAsientos,
            PrecioTotal:reservas.PrecioTotal
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
        const { UsuarioID, HorarioID, FechaReserva, Asientos, Estado,RAsientos,PrecioTotal,Destino } = req.body;

        const reserva = await   Reservas.findOneBy({ ReservaID: parseInt(req.params.id) });
       
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva does not exist' });
        }
       
        const usuario = await Users.findOne({ where: { Usuario: UsuarioID } });
        const horario = await Horarios.findOne({ where: { HorarioID: HorarioID } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }

        if (!horario) {
            return res.status(404).json({ message: 'Horario not found' });
        }
      
        if (!usuario || !horario) {
            return res.status(404).json({ message: "Usuario or Horario not found" });
        }

        reserva.Usuario = usuario;
        reserva.Horario = horario;
        reserva.FechaReserva = FechaReserva;
        reserva.Asientos = Asientos;
        reserva.Estado = Estado;
        reserva.RAsientos=RAsientos
        reserva.PrecioTotal=PrecioTotal

        await reserva.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Puedes usar otros servicios de correo como Outlook, Yahoo, etc.
            auth: {
                user: 'expresoarequipa@gmail.com',
                pass: 'zphx vklc elqj ubgd'
            }
        });

        // Configurar los detalles del correo electrónico
        const mailOptions = {
            from: 'expresoarequipa@gmail.com',
            to: 'lopezg.ll37@gmail.com',  
            subject: 'Nueva Reserva Confirmada',
            text: `El usuario ${usuario.Email},\n\n Reserva confirmada.\n\nDetalles de la reserva:\nFecha para el Viaje: ${FechaReserva}\nHorario: ${horario.HoraSalida},\nDestino: ${Destino},\nAsientos: ${RAsientos}\nPrecio Total: ${PrecioTotal}\n\nGracias por la reserva.`
        };
     //destino: ${Horario.destino}
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo: ', error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });

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
            Estado : reserva.Estado,
            RAsientos :reserva.RAsientos,
            PrecioTotal:reserva.PrecioTotal
        };

       
        return res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
