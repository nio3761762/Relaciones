import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./Users";
import { Horarios } from "./Horarios";
@Entity()
export class Reservas extends BaseEntity{
@PrimaryGeneratedColumn()
ReservaID: number;   
    @ManyToOne(() => Users, user => user.reservas)
    @JoinColumn({ name: "UsuarioID" })
    Usuario: Users;

    @ManyToOne(() => Horarios, horario => horario.reservas)
    @JoinColumn({ name: "HorarioID" })
    Horario: Horarios;
@Column({type: "date"})
FechaReserva: string;
@Column()
Asientos: number;
@Column({type: "varchar", length: 20})
Estado: string;
}
