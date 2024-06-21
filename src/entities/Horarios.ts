import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Rutas } from "./Rutas";
import { Buses } from "./Buses";
import { Reservas } from "./Reservas";

@Entity()
export class Horarios extends BaseEntity{
    @PrimaryGeneratedColumn()
    @PrimaryColumn({type: "integer"})
    HorarioID: number;
    @ManyToOne(() => Rutas, ruta => ruta.horarios)
    @JoinColumn({ name: "RutaID" })
    Ruta: Rutas;
    @ManyToOne(() => Buses, bus => bus.horarios)
    @JoinColumn({ name: "BusID" })
    Bus: Buses;
    @Column({type:"date"})
    FechaSalida: string;
    @Column({type:"time"})
    HoraSalida: string;
    @Column({type:"date"})
    FechaLlegada: string
    @Column({type:"integer"})
    Precio: number;
    
    @OneToMany(() => Reservas, reserva => reserva.Horario)
    reservas: Reservas[];

}