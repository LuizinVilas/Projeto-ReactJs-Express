create database ProjetoReact;
use ProjetoReact;

create table Users(
    Id int not null auto_increment,
    Username varchar(100) not null,
    Password varchar(100) not null,
    Contas float not null default 0.0,
    constraint Pk_Id primary key (Id)
);

create table Contas(
    Id int not null auto_increment,
    Valor float not null default 0,
    Descricao varchar(200) not null,
    User_Id int not null,
    constraint Pk_Id_Contas primary key (Id),
    constraint Fk_User_Id foreign key (User_Id) references Users(Id)
);