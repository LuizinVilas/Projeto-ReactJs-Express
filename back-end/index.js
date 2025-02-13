const express = require('express');
const Sequelize = require('sequelize');
const Cors = require('cors');
const {CreateUser, ReadUser, UpdateUser, DeleteUser} = require('./Models/UsersQuerys')
const {database, database_user, database_password}= require('./DatabaseConfigs');


const sequelize = new Sequelize(database, database_user, database_password, {
    host: 'host.docker.internal',
    dialect: 'mysql'
});

const App = express();

App.use(Cors());
App.use(express.json());
App.use(express.urlencoded({extended: true}));


async function Connection(){
    await sequelize.authenticate().then(() => {
        console.log('Connected with the database!');
        App.listen(3000 ,() => {
            console.log('127.0.0.1:3000');
        });
    })
    
}

App.post('/ProcessarDados', async (req, res) => {
    const { Creating } = req.body;
    if (!Creating) {
        const { Username, Password } = req.body;
        const User = await ReadUser(false, Username);
        if (User != null) {
            if (User.Password == Password) {
                res.json({ message: 'Autenticado' });
            } else {
                res.json({ message: 'Wrong Password!' });
            }
        } else {
            res.json({ message: 'User not find!' });
        }
    } else {
        const { CreateUsername, CreatePassword } = req.body;
        if (await ReadUser(false, CreateUsername) == null) {
            await CreateUser(CreateUsername, CreatePassword);
            res.json({ message: 'User Created!' });
        } else {
            res.json({ message: 'User Already exists!' });
        }
    }
});


App.post('/ListarUsuarios', async (req, res) => {
    const {All} = req.body;
    if(All){
        let Users = await ReadUser(All);
        if(Users){
            res.json({UserList: Users});
        } else {
            res.json({message: 'Empty!'});
        }
    } else {
        const {Username} = req.body;
        const Users  = await ReadUser(false, Username);
        if(Users){
            console.log(Users);
            res.json({UserList: Users});
        } else {
            res.json({message: 'Empty!'});
        }
    }
});


Connection();