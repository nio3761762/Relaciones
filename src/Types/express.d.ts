import { Request } from "express";
import jwt from 'jsonwebtoken';
declare global {
    namespace Express {
        interface Request {
            user?: jwt.JwtPayload; // Definir la propiedad user como opcional y del tipo jwt.JwtPayload
        }
    }
}