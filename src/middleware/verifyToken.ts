
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: jwt.JwtPayload; // Definir la propiedad user como opcional y del tipo jwt.JwtPayload
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key') as jwt.JwtPayload;
        console.log("Token decodificado en authMiddleware:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
export const publicAccessMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Aquí puedes agregar lógica adicional para permitir acceso público a rutas específicas
    next();
};