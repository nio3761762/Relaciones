create table Buses(
BusID serial primary key,
	Placa varchar(7),
   Modelo varchar(50),
	Capacidad integer
);

create table Users(
Usuario varchar(8) primary key,
	Password varchar(20),
	Email varchar(100)
);

create table Rutas(
    RutaID serial primary key, 
	Origen varchar(100) not null ,
    Destino varchar(100) not null
);


create table Horarios(
    HorarioID serial primary key,
	RutasID integer,
	BusID integer,
	foreign key (RutasID) references Rutas(RutaID),
	foreign key (BusID) references Buses(BusID),
	FechaSalida date,
	HoraSalida time,
	fechaLlegada date,
	Precio integer
);

create table reservas(
     ReservaID serial primary key,
	FechaReserva date,
	Asientos integer,
	Estado varchar(1),
	RAsientos integer,
	PrecioTotal integer	,
	 UsuarioID varchar(8),
	foreign key(UsuarioID) references Users(Usuario), 
	HorarioID integer,
	foreign key(HorarioID) references Horarios(HorarioID),
);

INSERT INTO Users 
VALUES ('user1', '1234567', 'user1@example.com'),
       ('user2', '1234567', 'user2@example.com'),
       ('user3', '1234567', 'user3@example.com');
	   
	   
	   
INSERT INTO Buses 
VALUES (1,'ABC123', 'Model X', 50),
       (2,'DEF456', 'Model Y', 40),
       (3,'GHI789', 'Model Z', 30);	   
	   
	   INSERT INTO Rutas 
VALUES (1,'Tarija', 'Yacuiba'),
       (2,'Tarija', 'Bermejo'),
       (3,'Tarija', 'Villamontes');
	   select * from horarios

		   INSERT INTO Horarios
VALUES (1,'2024-06-22','13:00:00', '2024-06-22', 50,1,1),
       (2,'2024-06-23', '18:00:00', '2024-06-23', 45,2,2),
       (3, '2024-06-24', '20:00:00', '2024-06-24', 40,3,3);	   
	   