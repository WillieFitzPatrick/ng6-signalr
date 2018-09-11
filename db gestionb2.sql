
DROP TABLE TiposDoc
CREATE TABLE TiposDoc(
   Id int Identity(1,1) not null,
   Codigo int not null,
   Documento varchar(50) not NULL,
   Estado int not null
)
Insert into TiposDoc (Codigo, Documento, Estado) values
    (80,'CUIT',1),
    (87,'CDI',1),
    (91,'CI Extranjera',1),
    (94,'Pasaporte',1),
    (96,'DNI',1),
    (99,'Otro',1)

DROP TABLE CondicionesIVA
CREATE TABLE CondicionesIVA (
   Id int Identity(1,1) not null,
   Codigo int not null,
   CondicionIVA varchar(50) not NULL,
   Estado int not null    
)

Insert into CondicionesIVA (Codigo, CondicionIVA, Estado) values
(1	,'IVA Responsable Inscripto',1),
(2	,'IVA Responsable no Inscripto',1),
(3	,'IVA no Responsable',1),
(4	,'IVA Sujeto Exento',1),
(5	,'Consumidor Final',1),
(6	,'Responsable Monotributo',1),
(7	,'Sujeto no Categorizado',1),
(8	,'Proveedor del Exterior',1),
(9	,'Cliente del Exterior',1),
(10	,'IVA Liberado – Ley Nº 19.640',1),
(11	,'IVA Responsable Inscripto – Agente de Percepción',1),
(12	,'Pequeño Contribuyente Eventual',1),
(13	,'Monotributista Social',1),
(14	,'Pequeño Contribuyente Eventual Social',1)



DROP TABLE Clientes
CREATE TABLE Clientes(
   Id int Identity(1,1) not null,
   Fantasia varchar(100),
   Cliente varchar(100) not null,
   TipoDocId int not null,
   NroDoc varchar(20) not null,
   Calle varchar(100),
   CodPos varchar(10),
   Ciudad varchar(50),
   Provincia varchar(50),
   Telefono varchar(50),
   Mail varchar(100),
   CondicionIVAId int not null,
   Estado int not null
)

Insert into Clientes (Fantasia,Cliente,TipoDocId,NroDoc,Calle,CodPos,Ciudad,Provincia,Telefono,Mail,CondicionIVAId,Estado) 
values ('SistemasW','Guillermo Fitz Patrick',1,'20-18134822-5','Av. Moyano 2138','9001','Rada Tilly', 'Chubut','+54 9297 6240615','gfitzpatrick@sistemasw.com.ar',1,1)

Select * From Clientes