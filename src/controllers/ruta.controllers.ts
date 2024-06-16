import { Request, Response } from "express";
import { Rutas } from "../entities/Rutas";
import exp from "constants";


    export const createRuta = async (req:Request, res:Response) =>{

    try {   
            const {Origen, Destino} = req.body;
    
            const ruta = new Rutas();
            ruta.Origen = Origen;
            ruta.Destino = Destino;
            
            await ruta.save()
            return res.json(ruta)
    
    } catch (error) {
        if(error instanceof Error){
                return res.status(500).json({message: error.message})
            }
        }
    }
    
    export const getRutas = async ( _req:Request, res:Response) =>{
        try {
            const rutas = await Rutas.find();
            return res.json({rutas:rutas})    
        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({message: error.message})
            }
        }
    }
    
    export const updateRuta = async (req:Request, res:Response) => {
    
        try {
            const {Origen, Destino} = req.body;
        
        const ruta = await Rutas.findOneBy({RutaID: parseInt(req.params.id)});
        
        if(!ruta) return res.status(404).json({message: 'Ruta does not exists'});
    
        ruta.Origen = Origen;
        ruta.Destino = Destino;
    
        ruta.save();
        
        return res.sendStatus(204)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({message: error.message})
            }
        }
    }
    
    export const deleteRuta = async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
    
        const result = await Rutas.delete({RutaID: parseInt(id)})
    
        if(result.affected === 0){
            return res.status(404).json({message: 'Ruta not found'})
        }
        
        return res.sendStatus(204)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({message: error.message})
            }
        }
    }
    
    export const getRuta = async (req:Request, res: Response) => {
        try {
            const {id} = req.params;
            const ruta = await Rutas.findOneBy({RutaID: parseFloat(id)});
            if(ruta === null){
                return res.status(404).json('Ruta not found')
            }
            return res.json(ruta);
        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({ message: error.message})
            }
        }
    }