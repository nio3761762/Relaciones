import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Horarios } from "./Horarios";

@Entity()
export class Buses extends BaseEntity{
    @PrimaryGeneratedColumn()
    @PrimaryColumn({type: "integer"})
    BusID: number;
    @Column({type: "varchar", length: 7})
    Placa: string;
    @Column({type: "varchar", length: 50})
    Modelo: string;
    @Column({type: "integer"})
    Capacidad: number
    @OneToMany(() => Horarios, horario => horario.Bus)
    horarios: Horarios[];
}