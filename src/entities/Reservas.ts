import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Users } from "./Users";
import { Horarios } from "./Horarios";


type EstadoReserva = "A" | "I";

@Entity()
export class Reservas extends BaseEntity {
    @PrimaryGeneratedColumn()
    ReservaID: number;

    @Column({ type: "date" })
    FechaReserva: string;

    @Column({ type: "integer" })
    Asientos: number;

    @Column({ type: "varchar", length: 1 })
    Estado: string;

    @Column({ type: "integer" })
    RAsientos: number;

    @Column({ type: "integer" })
    PrecioTotal: number;

    @ManyToOne(() => Users, user => user.reservas)
    @JoinColumn({ name: "UsuarioID" })
    Usuario: Users;

    @ManyToOne(() => Horarios, horario => horario.reservas)
    @JoinColumn({ name: "HorarioID" })
    Horario: Horarios;
}
