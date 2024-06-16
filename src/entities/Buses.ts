import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Horarios } from "./Horarios";

@Entity()
export class Buses extends BaseEntity{
    @PrimaryGeneratedColumn()
    BusID: number;
    @Column({type: "varchar", length: 7})
    Placa: string;
    @Column({type: "varchar", length: 50})
    Modelo: string;
    @Column({type: "int"})
    Capacidad: number
    @OneToMany(() => Horarios, horario => horario.Bus)
    horarios: Horarios[];
}