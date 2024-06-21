import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,  OneToMany, PrimaryColumn } from "typeorm";
import { Horarios } from "./Horarios";

@Entity()
export class Rutas extends BaseEntity{
@PrimaryGeneratedColumn()
@PrimaryColumn({type: "integer"})
RutaID: number;   
@Column({type: "varchar", length: 100})
Origen: string;
@Column({type: "varchar", length: 100})
Destino: String;
@OneToMany(() => Horarios, horario => horario.Ruta)
horarios: Horarios[];
}
