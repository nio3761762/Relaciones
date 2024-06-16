import { Request, Response } from "express"
import { Users } from "../entities/Users"
import exp from "constants";
import bcrypt from "bcryptjs"; // Para hashear y comparar contraseñas

export const login = async (req: Request, res: Response) => {
     try {
        const { Usuario, Password } = req.body;
        
        const user = await Users.findOneBy({ Usuario });
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(user.Password, 10);
        const isMatch = await bcrypt.compare(Password, hashedPassword);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        return res.json({ message: 'Login successful', user });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
export const createUser = async (req:Request, res:Response) =>{

try {   
        const {Usuario, Password, Email} = req.body;
       
        const existingUser = await Users.findOne({ where: { Usuario } });

        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }

        const user = new Users();
        user.Usuario = Usuario;
        user.Password =Password;
        user.Email = Email;
        
        await user.save()
        return res.json(user)

} catch (error) {
    if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
}

export const getUsers = async ( req:Request, res:Response) =>{
    try {
        const users = await Users.find();
        return res.json(users)    
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
}

export const updateUser = async (req:Request, res:Response) => {

    try {
        const {Usuario, Password, Email} = req.body;
    
    const user = await Users.findOneBy({Usuario: req.params.id});
    
    if(!user) return res.status(404).json({message: 'User does not exists'});

    user.Usuario = Usuario;
    user.Password = Password;
    user.Email = Email;

    user.save();
    
    return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export const deleteUser = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;

    const result = await Users.delete({Usuario: id})

    if(result.affected === 0){
        return res.status(404).json({message: 'user not found'})
    }
    
    return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export const getUser = async (req:Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await Users.findOneBy({Usuario: id});
        
        if(user === null){
            return res.status(404).json('user not found')
        }
        return res.json(user);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message})
        }
    }
}