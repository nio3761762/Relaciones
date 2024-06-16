"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./entities/Users");
const Buses_1 = require("./entities/Buses");
const Rutas_1 = require("./entities/Rutas");
const Horarios_1 = require("./entities/Horarios");
const Reservas_1 = require("./entities/Reservas");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "transportedb",
    logging: true,
    entities: [Users_1.Users, Buses_1.Buses, Rutas_1.Rutas, Horarios_1.Horarios, Reservas_1.Reservas],
    synchronize: true
});
