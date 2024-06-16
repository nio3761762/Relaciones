import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Reservas } from "./Reservas";

@Entity()
export class Users extends BaseEntity{
    @PrimaryColumn({type: "varchar", length: 8})
    Usuario: string;
    @Column({type: "varchar", length: 20})
    Password: string;
    @Column({type: "varchar", length: 100})
    Email: string;

    @OneToMany(() => Reservas, reserva => reserva.Usuario)
    reservas: Reservas[];
}