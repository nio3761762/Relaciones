import { Request, Response } from "express";
import { Buses } from "../entities/Buses";
import { error } from "console";

export const createBus = async (req:Request, res:Response) => {
    try {
        const {Placa, Modelo, Capacidad} = req.body;

        const Bus = new Buses();
        Bus.Placa = Placa;
        Bus.Modelo = Modelo;
        Bus.Capacidad = Capacidad;

        await Bus.save();
        return res.json(Bus)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}
export const getBuses = async (req:Request, res:Response) => {
    try {
        const Bus = await Buses.find();
        return res.json(Bus)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}
export const updateBus = async (req:Request, res:Response) => {
    try {
        const {Placa, Modelo, Capacidad} = req.body;

        const Bus = await Buses.findOneBy({BusID: parseInt(req.params.id)});
        if(!Bus) return res.status(404).json({message: 'bus doest not exists'})

        Bus.Placa = Placa;
        Bus.Modelo = Modelo;
        Bus.Capacidad = Capacidad;

        Bus.save();
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}
export const deleteBus = async (req:Request, res:Response) => {
    try {
        const {id} = req .params;
        const result = await Buses.delete({BusID: parseInt(id)})

        if(result.affected === 0){
            return res.status(404).json({message: 'Bus not found'});
        }
        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}
export const getBus = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const bus = await Buses.findOneBy({BusID: parseInt(id)});

        if(bus === null){
            return res.status(404).json('Bus not found')
        }
        return res.json(bus)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message})
        }
    }
}