import { DataSource } from "typeorm";
import {Users} from './entities/Users'
import { Buses } from "./entities/Buses";
import { Rutas } from "./entities/Rutas";
import { Horarios } from "./entities/Horarios";
import { Reservas } from "./entities/Reservas";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "transportedb",
    logging: true,
    entities: [Users, Buses, Rutas, Horarios, Reservas],
    synchronize: true
})